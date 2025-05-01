<script>
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import { tick } from 'svelte';
    
    let { data } = $props();
    const { metadata, content } = data;
    
    // Parse markdown content to HTML
    const htmlContent = marked(content);
    
    // Array to store headings
    let headings = $state([]);
    let activeHeading = $state('');
    let collapsedSections = $state({}); // Track collapsed state of sections
    
    // Reference to the content container
    let contentContainer;
    
    // Function to toggle section collapse state
    function toggleSection(id) {
        collapsedSections[id] = !collapsedSections[id];
        collapsedSections = {...collapsedSections}; // Force reactivity
    }
    
    // Function to check if a section should be shown
    function shouldShowHeading(heading, headings) {
        // Always show top-level headings
        if (heading.level <= 2) return true;
        
        // Find parent heading
        const headingIndex = headings.indexOf(heading);
        let parentLevel = heading.level - 1;
        
        for (let i = headingIndex - 1; i >= 0; i--) {
            if (headings[i].level < heading.level) {
                // Check if parent section is collapsed
                if (collapsedSections[headings[i].id]) {
                    return false;
                }
                
                // If found parent at the direct level above, no need to check further
                if (headings[i].level === parentLevel) {
                    break;
                }
            }
        }
        
        return true;
    }
    
    onMount(async () => {
        // Wait for the next DOM update to ensure content is rendered
        await tick();
        
        // Get all headings from the article AFTER it's rendered to the DOM
        const articleHeadings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
        console.log('Found headings:', articleHeadings.length); // Debug
        
        // Clear headings array
        headings = [];
        
        articleHeadings.forEach((heading) => {
            // Create an ID for the heading if it doesn't have one
            if (!heading.id) {
                heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
            }
            
            // Initialize collapsed state for headings that might have children
            collapsedSections[heading.id] = false; // Default to expanded
            
            headings.push({
                id: heading.id,
                title: heading.textContent,
                level: parseInt(heading.tagName.substring(1)),
                hasChildren: false // Will be determined later
            });
        });
        
        // Mark headings that have children
        for (let i = 0; i < headings.length - 1; i++) {
            if (headings[i+1].level > headings[i].level) {
                headings[i].hasChildren = true;
            }
        }
        
        console.log('Processed headings:', headings); // Debug
        
        // Setup Intersection Observer for scroll spy
        if (headings.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        activeHeading = entry.target.id;
                    }
                });
            }, { rootMargin: '-100px 0px -80% 0px' });
            
            articleHeadings.forEach(heading => {
                observer.observe(heading);
            });
        }
    });
</script>
  
<svelte:head>
    <title>{metadata.title}</title>
</svelte:head>

<section class="flex flex-col lg:flex-row">
    <!-- Sidebar Navigation -->
    {#if headings.length > 0}
    <aside class="hidden lg:block sticky top-20 h-fit max-h-[80vh] overflow-y-auto w-64 p-4 self-start">
        <nav class="toc">
            <h4 class="text-lg font-semibold mb-3 text-green-700 dark:text-green-400">Contents</h4>
            <ul class="space-y-2">
                {#each headings as heading}
                {#if shouldShowHeading(heading, headings)}
                <li class="pl-{(heading.level - 1) * 4}">
                    <div class="flex items-center">
                        {#if heading.hasChildren}
                        <button 
                            onclick={() => toggleSection(heading.id)}
                            class="w-4 h-4 flex items-center justify-center mr-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            aria-label={collapsedSections[heading.id] ? "Expand section" : "Collapse section"}
                        >
                            <svg class="w-3 h-3 transition-transform duration-200 {collapsedSections[heading.id] ? '' : 'transform rotate-90'}" 
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        {:else}
                        <div class="w-4 mr-3"></div> <!-- Spacer for alignment -->
                        {/if}
                        
                        <a 
                            href="#{heading.id}" 
                            class="py-1 flex-grow border-l-2 pl-2 text-sm transition-colors duration-200 hover:text-green-700 dark:hover:text-green-400 {activeHeading === heading.id 
                                ? 'border-green-600 text-green-700 dark:text-green-400 font-medium' 
                                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}"
                        >
                            {heading.title}
                        </a>
                    </div>
                </li>
                {/if}
                {/each}
            </ul>
        </nav>
    </aside>
    {/if}

    <!-- Main Content -->
    <div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5 pt-10 flex flex-col">
        <article class="bg-white dark:bg-black rounded-lg shadow-lg p-6 lg:p-8 mx-auto w-full max-w-3xl">
            <header class="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h1 class="text-3xl font-bold mb-2 text-green-900 dark:text-white">{metadata.title}</h1>
                <p class="text-slate-600 dark:text-slate-400 italic">{new Date(metadata.date).toLocaleDateString()}</p>
            </header>
            
            <div bind:this={contentContainer} class="prose prose-green dark:prose-invert max-w-none dark:text-slate-200">
                {@html htmlContent}
            </div>
            
            <footer class="mt-10 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a href="/blogs" class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 dark:bg-green-900 dark:hover:bg-green-800 transition duration-300">
                    <svg class="w-3.5 h-3.5 me-2 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    Back to all posts
                </a>
            </footer>
        </article>
    </div>
</section>
