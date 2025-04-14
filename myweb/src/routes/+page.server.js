import { ACCESS_KEY , TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '$env/static/private';
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
		const access_key = ACCESS_KEY?.toString().trim();

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
		// 3. Submit to Web3Forms
		try {
			const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					access_key: access_key,
					name: name,
					email: email,
					company: company,
					message: message
				})
			});

			const web3FormsResult = await web3FormsResponse.json();

			if (!web3FormsResult.success) {
				return fail(500, { error: web3FormsResult.message || 'Web3Forms submission failed' });
			}
		} catch (error) {
			return fail(500, { error: 'Web3Forms API error' });
		}



		// 4. Prepare the Telegram message
		const telegramText = `📬 *New Contact Submission*:
*Name:* ${escapeMarkdown(name)}
*Email:* ${escapeMarkdown(email)}
*Company:* ${escapeMarkdown(company)}
*Message:* ${escapeMarkdown(message)}`;

		// 5. Send to Telegram
		const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				text: telegramText,
				parse_mode: 'MarkdownV2'
			})
		});

		if (!telegramRes.ok) {
			const errorText = await telegramRes.text();
			console.error('Telegram Error:', errorText);
			return fail(500, { error: 'Telegram API error' });
		}

		// 6. Success!
		return { success: true };
	}
};
