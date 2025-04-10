<script>
    const {skill} = $props();
</script>

<div class="group group-hover:scale-110 transition-transform duration-500 ease-in-out transform hover:shadow-lg dark:hover:shadow-green-400 hover:shadow-green-800 rounded-lg dark:bg-gray-800 p-4 m-2 flex flex-col justify-center items-center text-center bg-green-700">
    <img src={skill.icon} alt={skill.name} class="w-16 h-16 m-2 group-hover:scale-110 transition-transform duration-500 ease-in-out transform" />
    <div class="flex flex-col justify-center items-center text-center duration-500 ease-in-out group-hover:scale-120 transform scale-100">
        <h4 class="dark:text-white text-green-900 font-bold text-xl">{skill.name}</h4>
    </div>
</div> 