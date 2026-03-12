<script>
    let isDark = $state(true);
    let { children } = $props();
    import { Navbar } from '$components';
    import { theme } from '$lib/stores/themeStore';
</script>

<div class="bg-white dark:bg-black selection:bg-green-700 selection:text-white {theme == 'dark' ? 'dark' : ''} transition duration-700 ease-in-out h-full pt-10">
    <header class="fixed w-full z-20 top-0 start-0">
        <Navbar />
    </header>
    <div class="min-h-screen flex flex-col justify-center items-center w-full pt-10">
        {@render children()}
    </div>
</div>