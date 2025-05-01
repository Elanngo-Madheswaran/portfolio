import { error } from '@sveltejs/kit';

export async function load() {
    try {
        // Update to new glob syntax
        const postFiles = import.meta.glob('/static/content/blogs/*.{md,mdx}', { 
            eager: true, 
            query: '?raw',
            import: 'default'
        });
        
        // Process each post file
        const posts = [];
        
        for (const [path, content] of Object.entries(postFiles)) {
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
            
            // Get filename from path
            const filename = path.split('/').pop().replace(/\.(md|mdx)$/, '');
            
            // Extract slug from frontmatter or filename
            const articleNo = metadata['ArticleNo'] || metadata['articleNo'] || metadata['article_no'] || filename;
            const date = metadata['Last-edited'] || metadata.date || new Date().toISOString();
            const title = metadata.Title || metadata.title || filename;
            const excerpt = metadata.excerpt || '';
            
            // Add to posts array
            posts.push({
                slug: articleNo,
                title: title,
                date: date,
                excerpt: excerpt,
                path: path
            });
        }
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return {
            posts
        };
    } catch (e) {
        console.error(e);
        throw error(500, 'Could not load blog posts');
    }
}