<script>
	import "../app.css";
    let { children } = $props();

</script>
<svelte:head>
    <title>Elanngo Madheswaran's Portfolio | Portfolio</title>
</svelte:head>

<div class="w-full dark:bg-black  bg-white flex flex-col justify-center items-center">
<div class="p-2 sm:m-5 sm:p-5 w-full max-w-screen-2xl">
    {@render children()}
</div>
</div>