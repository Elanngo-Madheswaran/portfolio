<script>
    let { data } = $props();
    let posts = $state(data.posts || []); // Ensure posts is an array
    
    // Search term and sortOrder
    let searchTerm = $state('');
    let sortOrder = $state('dateDesc'); // Default sort by newest first
    
    // Filtered and sorted posts
    let filteredPosts = $derived.by(() => {
        // Filter posts by search term
        return posts
            .filter(post => {
                if (!searchTerm) return true;
                const searchLower = searchTerm.toLowerCase();
                return post.title.toLowerCase().includes(searchLower) || 
                       post.excerpt.toLowerCase().includes(searchLower);
            })
            .sort((a, b) => {
                if (sortOrder === 'dateDesc') return new Date(b.date) - new Date(a.date);
                if (sortOrder === 'dateAsc') return new Date(a.date) - new Date(b.date);
                if (sortOrder === 'titleAsc') return a.title.localeCompare(b.title);
                if (sortOrder === 'titleDesc') return b.title.localeCompare(a.title);
                return 0;
            });
    });
</script>

<svelte:head>
    <title>My Blog</title>
</svelte:head>

<div class="bg-white dark:bg-black selection:bg-green-700 selection:text-white transition duration-700 ease-in-out">
    <section class="flex flex-col">
        <div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5 flex flex-col">
            
            <!-- Search and sort controls -->
            <div class="flex flex-col sm:flex-row justify-between mb-6 px-5">
                <div class="mb-4 sm:mb-0 sm:w-1/2 mr-2">
                    <input 
                        type="text" 
                        bind:value={searchTerm}
                        placeholder="Search blogs..." 
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    />
                </div>
                <div class="sm:w-1/3">
                    <select 
                        bind:value={sortOrder}
                        class="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    >
                        <option value="dateDesc">Newest first</option>
                        <option value="dateAsc">Oldest first</option>
                        <option value="titleAsc">Title (A-Z)</option>
                        <option value="titleDesc">Title (Z-A)</option>
                    </select>
                </div>
            </div>
            
            <!-- Blog list -->
            <div class="w-full px-5">
                <ul class="flex flex-col w-full space-y-4">
                    {#each filteredPosts as post}
                        <li class="w-full p-6 rounded-lg shadow bg-green-700 dark:bg-green-900">
                            <a href="/blogs/{post.articleNo || post.slug}" class="block">
                                <h4 class="mb-2 text-2xl font-bold tracking-tight text-white">{post.title}</h4>
                                
                                {#if post.date}
                                    <p class="mb-3 font-normal text-slate-200 italic">Last edited: {new Date(post.date).toLocaleDateString()}</p>
                                {/if}
                                
                                {#if post.excerpt}
                                    <p class="mb-3 font-normal text-slate-100 dark:text-slate-200">{post.excerpt}</p>
                                {/if}
                                
                                <div class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Read more
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </div>
                            </a>
                        </li>
                    {/each}

                    {#if filteredPosts.length === 0}
                        <li class="w-full p-6 rounded-lg shadow bg-gray-100 dark:bg-gray-800">
                            <p class="text-center text-gray-600 dark:text-gray-400">No blogs found matching your search.</p>
                        </li>
                    {/if}
                </ul>
            </div>
        </div>
    </section>
</div>