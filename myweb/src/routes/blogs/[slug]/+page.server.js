import { error } from '@sveltejs/kit';
import { marked } from 'marked';

export async function load({ params }) {
    try {
        const { slug } = params;
        
        // Update the deprecated 'as: raw' syntax to the new format
        const posts = import.meta.glob('/static/content/blogs/*.{md,mdx}', { 
            eager: true, 
            query: '?raw',
            import: 'default'
        });
        
        // Find the matching post by article number or filename
        let matchingPost = null;
        let matchingPath = null;

        for (const [path, content] of Object.entries(posts)) {
            // Extract frontmatter
            const frontmatterMatch = content.match(/---\r?\n([\s\S]*?)\r?\n---/);
            const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
            
            // Parse frontmatter
            const metadata = {};
            frontmatter.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                    const value = valueParts.join(':').trim();
                    metadata[key.trim()] = value;
                }
            });

            // Check if article number matches
            const articleNo = metadata['ArticleNo'] || metadata['articleNo'] || metadata['article_no'];
            if (articleNo === slug) {
                matchingPost = content;
                matchingPath = path;
                break;
            }
            
            // Fallback to filename if no article number match
            const filename = path.split('/').pop().replace(/\.(md|mdx)$/, '');
            if (filename === slug) {
                matchingPost = content;
                matchingPath = path;
                break;
            }
        }
        
        if (!matchingPost) {
            throw error(404, `Could not find post: ${slug}`);
        }
        
        // Extract and parse frontmatter
        const frontmatterMatch = matchingPost.match(/---\r?\n([\s\S]*?)\r?\n---/);
        const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
        const mainContent = matchingPost.replace(/---\r?\n[\s\S]*?\r?\n---/, '').trim();
        
        // Parse frontmatter
        const metadata = {};
        frontmatter.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim();
                metadata[key.trim()] = value;
            }
        });
        
        // Get filename from path
        const filename = matchingPath.split('/').pop().replace(/\.(md|mdx)$/, '');
        
        // Use Last-edited as the date field
        const date = metadata['Last-edited'] || metadata.date || filename.split('-').slice(0, 3).join('-');
        const articleNo = metadata['ArticleNo'] || metadata['articleNo'] || metadata['article_no'] || null;

        // Parse markdown to HTML to extract headings
        const htmlContent = marked(mainContent);
        
        // Extract headings from HTML content
        const headings = extractHeadingsFromHTML(htmlContent);
        
        return {
            metadata: {
                title: metadata.Title || metadata.title || filename,
                date: date,
                articleNo: articleNo,
                filename: filename,
                ...metadata,
                slug
            },
            content: mainContent,
            headings: headings
        };
    } catch (e) {
        console.error(e);
        throw error(404, `Could not find post: ${params.slug}`);
    }
}

// Function to extract headings from HTML content
function extractHeadingsFromHTML(html) {
    // Use a regular expression to find all heading tags
    const headingRegex = /<h([1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/h\1>/gi;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(html)) !== null) {
        // Create an ID from the heading content
        const level = parseInt(match[1]);
        const content = match[2].replace(/<[^>]*>/g, ''); // Remove any HTML tags inside the heading
        const id = content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

        headings.push({
            id,
            title: content,
            level
        });
    }

    return headings;
}