<script module>
  // Helper function to escape special characters in regex
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Processing function: Add IDs to HTML headings
  function modifyHTMLWithIDs(html, headings) {
    if (!headings || headings.length === 0) return html;

    let modifiedHTML = html;

    // Replace each heading with a version that has the id attribute
    headings.forEach((heading) => {
      const level = heading.level;
      const title = escapeRegExp(heading.title);
      const id = heading.id;

      // Create regex to match the heading
      const regex = new RegExp(
        `<h${level}([^>]*)>(${title})<\/h${level}>`,
        "i",
      );

      // Replace with version that includes id
      modifiedHTML = modifiedHTML.replace(
        regex,
        `<h${level}$1 id="${id}">$2</h${level}>`,
      );
    });

    return modifiedHTML;
  }

  // Processing function: Modify img src paths to include /content/ prefix
  function modifyImgSrcs(html) {
    if (!html) return html;

    return html.replace(/src="([^"]*)"/g, (match, src) => {
      // Don't modify if already contains /content/ or is an absolute URL
      if (src.startsWith("/content/") || src.startsWith("http")) {
        return match;
      }

      // Handle relative paths (e.g., ../blog-assets/image.png or blog-assets/image.png)
      let normalizedPath = src;

      // Remove leading ../
      normalizedPath = normalizedPath.replace(/^(\.\.\/)+/, "");

      // Remove leading ./
      normalizedPath = normalizedPath.replace(/^\.\//, "");

      // Add /content/ prefix if not present
      if (!normalizedPath.startsWith("/")) {
        normalizedPath = "/" + normalizedPath;
      }

      return `src="/content${normalizedPath}"`;
    });
  }

  // Processing function: Add copy buttons to code blocks
  function addCopyButtonsToCodeBlocks(html) {
    if (!html) return html;

    return html.replace(
      /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
      (match, codeAttrs, codeContent) => {
        return `<div class="code-block-wrapper"><button class="copy-code-btn" title="Copy code">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
        </button><pre><code${codeAttrs}>${codeContent}</code></pre></div>`;
      },
    );
  }

  // Factory function: Process markdown content through all transformations
  export function processMarkdownContent(htmlContent, headings) {
    if (!htmlContent) return "";

    // Pipeline: Apply transformations in sequence
    let processed = htmlContent;
    processed = modifyHTMLWithIDs(processed, headings);
    processed = modifyImgSrcs(processed);
    processed = addCopyButtonsToCodeBlocks(processed);

    return processed;
  }
</script>

<script>
  import { marked } from "marked";
  import { afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";

  let { data } = $props();
  const { metadata, content, headings } = data;

  // Parse markdown content to HTML
  const htmlContent = marked(content, {
    // Add an option to include IDs in heading elements
    renderer: new marked.Renderer(),
  });

  // Keep track of active heading for scrollspy
  let activeHeading = $state("");

  // Reference to the content container
  let contentContainer;

  // Setup scrollspy after page load or navigation
  function setupScrollSpy() {
    if (!contentContainer || !headings || headings.length === 0) return;

    // Find all heading elements that have IDs
    const headingElements = Array.from(
      contentContainer.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ).filter((el) => el.id);

    // Set up intersection observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeHeading = entry.target.id;
          }
        });
      },
      { rootMargin: "-20px 0px -80% 0px" },
    );

    // Observe all heading elements
    headingElements.forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }

  // Set up scrollspy after navigation
  afterNavigate(() => {
    setupScrollSpy();
    setupCodeBlockCopyButtons();
  });

  onMount(() => {
    setupScrollSpy();
    setupCodeBlockCopyButtons();
  });

  // Set up copy button functionality for code blocks
  function setupCodeBlockCopyButtons() {
    const copyButtons = document.querySelectorAll(".copy-code-btn");

    copyButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();

        // Find the code element within the sibling pre tag
        const codeElement = button.nextElementSibling?.querySelector("code");
        if (!codeElement) return;

        // Get the text content
        const text = codeElement.textContent || "";

        try {
          await navigator.clipboard.writeText(text);

          // Visual feedback: change button appearance momentarily
          const originalSVG = button.innerHTML;
          button.innerHTML =
            '<svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
          button.classList.add("copied");

          // Revert after 2 seconds
          setTimeout(() => {
            button.innerHTML = originalSVG;
            button.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code:", err);
        }
      });
    });
  }

</script>

<svelte:head>
  <title>{metadata.title}</title>
</svelte:head>
<div class="flex max-w-screen-2xl items-center justify-center w-full">
  <section class="flex flex-col lg:flex-row w-full">
    <!-- Sidebar Navigation -->
    {#if headings && headings.length > 0}
      <aside
        class="hidden lg:block sticky top-20 h-fit max-h-[80vh] overflow-y-auto w-2/5 p-4 self-start"
      >
        <nav class="toc">
          <h4
            class="text-lg font-semibold mb-3 text-green-700 dark:text-green-400"
          >
            Contents
          </h4>
          <ul class="space-y-2">
            {#each headings as heading}
              <li class="pl-{(heading.level - 1) * 4}">
                <div class="flex items-center">
                  <a
                    href="#{heading.id}"
                    class="py-1 flex-grow border-l-2 pl-2 text-sm transition-colors duration-200 hover:text-green-700 dark:hover:text-green-400 {activeHeading ===
                    heading.id
                      ? 'border-green-600 text-green-700 dark:text-green-400 font-medium'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}"
                  >
                    {heading.title}
                  </a>
                </div>
              </li>
            {/each}
          </ul>
        </nav>
      </aside>
    {/if}

    <!-- Main Content -->
    <div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5 pt-10 flex flex-col">
      <article
        class="bg-white dark:bg-black rounded-lg shadow-lg p-6 lg:p-8 mx-auto w-full max-w-3xl"
      >
        <header class="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 class="text-3xl font-bold mb-2 text-green-900 dark:text-white">
            {metadata.title}
          </h1>
          <p class="text-slate-600 dark:text-slate-400 italic">
            {new Date(metadata.date).toLocaleDateString()}
          </p>
        </header>

        <div
          bind:this={contentContainer}
          class="prose prose-green dark:prose-invert max-w-none dark:text-slate-200 prose-sm sm:prose-base lg:prose-lg xl:prose-xl"
        >
          {@html processMarkdownContent(htmlContent, headings)}
        </div>

        <footer
          class="mt-10 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <a
            href="/blogs"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 dark:bg-green-900 dark:hover:bg-green-800 transition duration-300"
          >
            <svg
              class="w-3.5 h-3.5 me-2 rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
            Back to all posts
          </a>
        </footer>
      </article>
    </div>
  </section>
</div>

<style>
  :global(.code-block-wrapper) {
    position: relative;
    display: block;
  }

  :global(.copy-code-btn) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: rgb(209, 213, 219);
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, color 0.2s ease;
    z-index: 10;
  }

  :global(.copy-code-btn:hover) {
    background-color: rgba(0, 0, 0, 0.7);
    color: rgb(255, 255, 255);
  }

  :global(.copy-code-btn.copied) {
    background-color: rgba(34, 197, 94, 0.6);
  }

  /* Dark mode support */
  :global(.dark .copy-code-btn) {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgb(209, 213, 219);
  }

  :global(.dark .copy-code-btn:hover) {
    background-color: rgba(255, 255, 255, 0.15);
    color: rgb(255, 255, 255);
  }
</style>
