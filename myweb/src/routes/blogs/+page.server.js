import { error } from '@sveltejs/kit';

// Add this function to parse date strings with optional time component
function parseDateTime(dateTimeStr) {
    if (!dateTimeStr) return new Date().toISOString();
    
    // Check for YYYY-MM-DD, HH:MM format
    const dateTimeMatch = dateTimeStr.match(/^(\d{4}-\d{2}-\d{2})(?:,\s*(\d{2}:\d{2}))?$/);
    if (dateTimeMatch) {
        const datePart = dateTimeMatch[1];
        const timePart = dateTimeMatch[2] || '00:00';
        return `${datePart}T${timePart}:00`;
    }
    
    // Check for DD-MM-YYYY format (to handle legacy dates)
    const ddmmyyyyMatch = dateTimeStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (ddmmyyyyMatch) {
        const day = ddmmyyyyMatch[1].padStart(2, '0');
        const month = ddmmyyyyMatch[2].padStart(2, '0');
        const year = ddmmyyyyMatch[3];
        return `${year}-${month}-${day}T00:00:00`;
    }
    
    // If it's already in a valid format, return as is
    try {
        const date = new Date(dateTimeStr);
        if (!isNaN(date.getTime())) {
            return date.toISOString();
        }
    } catch (e) {
        // Invalid date, continue to default
    }
    
    // Default to current date/time
    return new Date().toISOString();
}

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
            const rawDate = metadata['Last-edited'] || metadata.date || filename.split('-').slice(0, 3).join('-');
            const date = parseDateTime(rawDate);
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