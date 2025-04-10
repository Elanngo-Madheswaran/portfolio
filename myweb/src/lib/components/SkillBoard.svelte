<script>
    import { Skill } from '$components';
    const { skillCategory } = $props();
</script>

<div class="border-2 dark:border-green-400 border-green-900 flex flex-wrap rounded-lg m-5 p-5 w-3/4 flex-col">
    <h4 class="dark:text-white text-green-900 font-extrabold text-4xl m-5 text-center">{skillCategory.category}</h4>
    <hr class="m-5 h-1 border-0 dark:bg-green-900 bg-black">
    <div class="flex flex-wrap mx-2 justify-center">
        {#each skillCategory.items as skill}
            <Skill {skill} />
        {/each}
    </div>
</div>