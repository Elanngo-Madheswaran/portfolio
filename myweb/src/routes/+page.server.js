import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '$env/static/private';
import { fail } from '@sveltejs/kit';

/** @satisfies {import('./$types').Actions} */

/**
 * Escapes Markdown special characters for Telegram's Markdown parser.
 * @param {string} text
 * @returns {string}
 */
function escapeMarkdown(text) {
	return text.replace(/([_*[\]()~`>#+=|{}.!-])/g, '\\$1');
}

export const actions = {
	
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim();
		const email = formData.get('email')?.toString().trim();
		const company = formData.get('company')?.toString().trim() || 'N/A';
		const message = formData.get('message')?.toString().trim();

		// 1. Basic field validation
		if (!name || !email || !message) {
			return fail(400, {
				error: 'Name, email, and message are required.',
				values: { name, email, company, message }
			});
		}

		// 2. Validate email format
		const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		if (!isValidEmail) {
			return fail(400, {
				error: 'Invalid email format.',
				values: { name, email, company, message }
			});
		}

		let telegramSuccess = false;

		// 3. Prepare and send Telegram message
		const telegramText = `📬 *New Contact Submission*:
*Name:* ${escapeMarkdown(name)}
*Email:* ${escapeMarkdown(email)}
*Company:* ${escapeMarkdown(company)}
*Message:* ${escapeMarkdown(message)}`;

		// 4. Send to Telegram
		try {
			const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: TELEGRAM_CHAT_ID,
					text: telegramText,
					parse_mode: 'MarkdownV2'
				})
			});

			telegramSuccess = telegramRes.ok;
			if (!telegramRes.ok) {
				const errorText = await telegramRes.text();
				console.error('Telegram Error:', errorText);
			}
		} catch (error) {
			console.error('Telegram API error:', error);
		}

		// 5. Return error only if Telegram fails
		if (!telegramSuccess) {
			return fail(500, { error: 'Failed to send notification. Please try again later.' });
		}

		return { success: true };
	}
};
