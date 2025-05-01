---
Title: My blog Implementation
Last-edited: 01-05-2025
excerpt: This article discusses how I implemented my blog
---
# How My Blog Works with SvelteKit and Markdown

## Introduction

In this post, I'll explain how I built my blog system using SvelteKit, markdown files, and Obsidian as my content editor. The system is designed to be simple, yet flexible, allowing me to write content naturally while maintaining a modern web experience.
### Idea overview:

I made my mind to write some blog by myself writing about the things I learn and apply for documenting the process and for future references and for the sake of creating content.

There are several ways to implement this blogs like using some existing cms and just posting my content there and fetching with some api. But I dont want to hazzle with their structure and styling might be a issue.

Since I already use Obsidian in my daily life for note taking and jornalling purpose I planned to integrate the blog system somehow so that I could use obsidian to edit my blogs , so for that I have to use md files to store my blogs.

As my portfolio website is made using [Svelte](https://svelte.dev/) I posted my idea in reddit and got some suggestions where I learnt that svelte has a built in module called [mdsvex ](https://svelte.dev/docs/cli/mdsvex) it allows to get the data in md files which can be rendered as html. One half of the process got cleared.

Other part is storing and syncing the md file from obsidian and my project repo there came another suggestion from another reddit user with his own  [blog](https://bryanhogan.com/blog/obsidian-astro-submodule) setup done using Astro and GitHub submodules. This works similar to my implementation but slightly more complicated here we store our md files in one repo and add that repo as a submodule inside our project repo so that we can have our md files separate and can be used in multiple projects at once. Though it seems nice I don't want multiple projects to share my blogs so I just sticked with a single repo
## Process

### Project setup

1. Open your existing svelte project or create a new one and open the `/static` folder inside src.
2. There create `content/blogs` and `content/blog-assets` folders.
3. Then open obsidian and then open the content folder as a vault and add git from community plugins
4. From then on you can create new blogs as a new note inside the `/blogs` folder and have you images and other assets inside `/blog-assests` folder
5. After making all the changes you can use the git plugin button in the obsidian sidebar to commit the changes to the project.
### Processing the blog files

As of the previous steps the blog md files will gets saved in the `/static/content/blogs` folder so we can easily get those files and process them inside our project , I use mdsvex to render the md to html and 

1. Use `import.meta.glob` to find all markdown files in the blogs directory
2. Parses frontmatter from each file to extract metadata
3. Organizes posts by date, title, and other properties
4. Returns a sorted list of posts as JSON
5. I do all these process inside  `/routes/blog/+page.server.js`
The code looks something like this 

```
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
```
 
Then we show the list of all the blogs and when they click any blog they go to specific route to show the complete blog which again gets the files and processes the total file inside +page.server.js. Note that I am using these files so that all the processing happens inside server so it will fast and reliable.
## Conclusion

This blog system provides me with a seamless writing experience while giving readers a modern, fast website experience. By using markdown files stored in the repository, I maintain full control over my content without needing a traditional CMS or database.

The combination of SvelteKit's performance, Obsidian's writing experience, and the simplicity of markdown creates an ideal platform for sharing my thoughts and projects.

Future enhancements might include:

- Adding tags and categories
- Implementing comments
- Creating an RSS feed
- Adding reading time estimates

If you're interested in building something similar, feel free to reach out or check out my GitHub repository!
