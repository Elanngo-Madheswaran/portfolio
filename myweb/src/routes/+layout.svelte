<script>
	import "../app.css";
    let { children } = $props();

</script>
<svelte:head>
    <title>Elanngo Madheswaran's Portfolio | Portfolio</title>
</svelte:head>

<div class="w-full dark:bg-black  bg-white flex flex-col justify-center items-center">
    {@render children()}
</div>