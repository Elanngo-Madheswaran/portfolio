import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const { slug } = params;
        
        // Use import.meta.glob to get all markdown files
        // Update deprecated 'as: raw' to 'query: ?raw, import: default'
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
        
        return {
            metadata: {
                title: metadata.Title || metadata.title || filename,
                date: date,
                articleNo: articleNo,
                filename: filename,
                ...metadata,
                slug
            },
            content: mainContent
        };
    } catch (e) {
        console.error(e);
        throw error(404, `Could not find post: ${params.slug}`);
    }
}