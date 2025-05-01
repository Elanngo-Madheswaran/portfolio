---
Title: My blog Implementation
Last-edited: 01-05-2025
excerpt: This article discusses how I implemented my blog
---
---
# How My Blog Works with SvelteKit and Markdown

## Introduction

In this post, I'll explain how I built my blog system using SvelteKit, markdown files, and Obsidian as my content editor. The system is designed to be simple, yet flexible, allowing me to write content naturally while maintaining a modern web experience.

## The Architecture Overview

My blog works through these main components:

1. **Content Creation** - Writing markdown files in Obsidian
2. **Content Storage** - Storing files in the static folder
3. **API Layer** - SvelteKit endpoints to process and serve the content
4. **Frontend Components** - Displaying the content with features like dark mode and table of contents

## Writing Content with Obsidian

I use [Obsidian](https://obsidian.md/) as my primary content editor. It's a powerful markdown editor that lets me write and organize my thoughts effectively. The process is simple:

1. Create a new markdown file in the `/static/content/blogs/` directory
2. Add frontmatter at the top of the file:
3. Write the content using standard markdown
4. The file automatically becomes available on my website

### What makes Obsidian great for this workflow:

- **Templates** - I've set up a template in `/static/content/template/Template.md` that provides the basic frontmatter structure
- **Preview** - I can see how my markdown will look while writing
- **Plugins** - Additional functionality like graph view helps me organize content

## Processing and Serving Content

The backend of my blog system is powered by SvelteKit's file-based routing and API endpoints:

### API Endpoint for Posts

The `/api/posts` endpoint (implemented in `src/routes/api/posts/+server.js`) does the heavy lifting:

1. Uses `import.meta.glob` to find all markdown files in the blogs directory
2. Parses frontmatter from each file to extract metadata
3. Organizes posts by date, title, and other properties
4. Returns a sorted list of posts as JSON

### Individual Post Loading

When a user visits a specific blog post:

1. The `[slug]` parameter in the URL is used to find the corresponding markdown file
2. The server component (`+page.server.js`) loads and parses the file
3. It first tries to match by `ArticleNo`, then falls back to matching by filename
4. Frontmatter is extracted for metadata, and the main content is separated
5. The parsed content is passed to the page component

## Frontend Display and Features

The frontend components render the blog with several key features:

### Blog List Page

The blog list (`/blogs`) page includes:

- Search functionality to filter posts by title or excerpt
- Sorting options (newest/oldest first, alphabetical)
- Responsive cards showing post title, date, and excerpt

### Individual Blog Post

Each blog post page (`/blogs/[slug]`) has:

1. **Hierarchical Table of Contents**
   - Automatically generated from headings in the content
   - Collapsible sections based on heading hierarchy
   - Active section highlighting as you scroll

2. **Responsive Design**
   - Mobile-friendly layout that adapts to different screen sizes
   - Sidebar that appears on larger screens

3. **Theme Support**
   - Seamless dark/light mode that persists across pages
   - Theme toggle in the navigation bar

## Theme Management

I implemented a theme system that:

1. Stores user preference in localStorage
2. Applies the theme consistently across all pages
3. Provides smooth transitions between themes
4. Uses Tailwind's dark mode classes for styling

The theme is controlled by a central store in `src/lib/stores/themeStore.js`, which ensures consistency across the entire site.

## Code Syntax Highlighting

For code blocks in my blog posts, I use the built-in syntax highlighting from the markdown parser. This makes technical content much more readable and visually appealing.

## Accessibility and Performance

The blog system is built with accessibility in mind:

- Proper semantic HTML structure
- ARIA attributes where appropriate
- Good color contrast in both light and dark modes
- Responsive design that works on all devices

## Conclusion

This blog system provides me with a seamless writing experience while giving readers a modern, fast website experience. By using markdown files stored in the repository, I maintain full control over my content without needing a traditional CMS or database.

The combination of SvelteKit's performance, Obsidian's writing experience, and the simplicity of markdown creates an ideal platform for sharing my thoughts and projects.

Future enhancements might include:

- Adding tags and categories
- Implementing comments
- Creating an RSS feed
- Adding reading time estimates

If you're interested in building something similar, feel free to reach out or check out my GitHub repository!

---

Happy coding!