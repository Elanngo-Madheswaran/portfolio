<script>
    const {skill} = $props();
</script>

<div class="group hover:scale-110 transition-all duration-500 ease-in-out transform hover:shadow-lg dark:hover:shadow-green-400 hover:shadow-green-950 rounded-lg dark:bg-gray-800 p-4 m-2 flex flex-col justify-center items-center text-center bg-green-700 ">
    <img src={skill.icon} alt={skill.name} class="w-16 h-16 m-2 group-hover:scale-110 transition-transform duration-500 ease-in-out transform" />
    <div class="flex flex-col justify-center items-center text-center duration-500 ease-in-out group-hover:scale-120 transform scale-100 group-hover:-translate-y-1">
        <h4 class="text-white font-bold text-xl">{skill.name}</h4>
    </div>
</div>