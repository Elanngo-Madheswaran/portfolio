import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    // Use import.meta.glob to get all markdown files
    const postImports = import.meta.glob('/static/content/blogs/*.{md,mdx}', { eager: true, as: 'raw' });
    
    const posts = Object.entries(postImports).map(([path, content]) => {
      // Extract filename from path (which now contains date)
      const filename = path.split('/').pop().replace(/\.(md|mdx)$/, '');
      
      // Extract frontmatter with a simple regex approach
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

      // Use the article number as the slug if available
      const articleNo = metadata['ArticleNo'] || metadata['articleNo'] || metadata['article_no'];
      const slug = articleNo || filename;
      
      // Use Last-edited as the date field if available
      const date = metadata['Last-edited'] || metadata.date || filename.split('-').slice(0, 3).join('-');
      
      return {
        slug,
        articleNo: articleNo || null,
        filename,
        title: metadata.Title || metadata.title || filename,
        date: date,
        excerpt: metadata.excerpt || '',
        ...metadata
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return json([]);
  }
}