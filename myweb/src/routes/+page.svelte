<script>
    import "../app.css";
    import { SkillBoard , Navbar } from "$components";



    function opentab(url) {
        window.open(url, '_blank');
    }


    let isDark = $state(true); 
    let skills = [
        {
            category: "Front End",
            items: [
                { name: "Svelte", icon: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" },
                { name: "React", icon: "https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" },
                { name: "Angular", icon: "https://profilinator.rishav.dev/skills-assets/angularjs-original.svg" },
                { name: "Bootstrap", icon: "https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" },
                { name: "Node.js", icon: "https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" },
                { name: "TypeScript", icon: "https://profilinator.rishav.dev/skills-assets/typescript-original.svg" },
                { name: "Tailwind CSS", icon: "https://profilinator.rishav.dev/skills-assets/tailwindcss.svg" },
                { name: "Next.js", icon: "https://profilinator.rishav.dev/skills-assets/nextjs.png" }
            ]
        },
        {
            category: "Programming",
            items: [
                { name: "Python", icon: "https://profilinator.rishav.dev/skills-assets/python-original.svg" },
                { name: "Java", icon: "https://profilinator.rishav.dev/skills-assets/java-original-wordmark.svg" },
                { name: "C", icon: "https://profilinator.rishav.dev/skills-assets/c-original.svg" },
                { name: "C++", icon: "https://profilinator.rishav.dev/skills-assets/cplusplus-original.svg" }
            ]
        },
        {
            category: "Others",
            items: [
                { name: "Blender", icon: "https://profilinator.rishav.dev/skills-assets/blender_community_badge_white.svg" },
                { name: "Git", icon: "https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" }
            ]
        }
    ];
    let projects = [
                    {
                        name: "Tic Tac Toe game",
                        description: "A basic tic tac toe game with game modes, sounds & user score boards made using react",
                        link: "https://tic-elanngo.vercel.app/"
                    },
                    {
                        name: "CGPA calculator",
                        description: "CGPA calculator made using angular js, with separate SGPA for each sem and CGPA as group with bulk upload feature",
                        link: "https://cgpa-elanngo.vercel.app/"
                    },
                    {
                        name: "Invoice Generator",
                        description: "Simple Invoice Generator with tax calculation and pdf output made using react",
                        link: "https://invoice-elanngo.vercel.app/"
                    },
                    {
                        name: "Morse code to English Convertor",
                        description: "Morse code to English convertor made using react with copy to clipboard feature and easy toggle",
                        link: "https://mte-elanngo.vercel.app/"
                    },
                    {
                        name: "Chess Timer",
                        description: "Chess timer with timing presets made using svelte",
                        link: "https://timer-elanngo.vercel.app/"
                    },
                    {
                        name: "RGB game",
                        description: "RGB color code guessing game made using react",
                        link: "https://rgb-elanngo.vercel.app/"
                    }
                ];

    function toggleDarkMode() {
        isDark = !isDark;
    }
</script>

<div class="bg-white dark:bg-black selection:bg-green-700 selection:text-white {isDark ? 'dark' : ''} transition duration-700 ease-in-out h-full">
        <header class="fixed w-full z-20 top-0 start-0">
            <!-- top nav bar -->
            <Navbar bind:isDark={isDark} />
            
        </header>
    
        <!-- Main text -->
        <div class="h-20" aria-hidden="true"></div>
        <div class="flex flex-col">
            <div class="text-dark dark:text-white flex m-5 p-5 xl:w-3/4 self-center md:flex-row flex-col">
                <div class="sm:m-5 sm:p-5 flex flex-col">
                    <p class="text-2xl lg:text-4xl font-bold">Hi <span class="dark:text-green-400 text-green-900">I'm</span></p>
                    <p class="font-bold lg:text-6xl text-4xl my-5 jello-horizontal">Elan<span class="bounce-in-bck inline-block">n</span>go <span class="dark:text-green-500 text-green-900">Madheswaran</span></p>
                    <p class="sm:text-xl text-md">A passionate <span class="dark:text-green-400 text-green-900">web developer</span> from India</p>
                    <button class="my-5 w-48 p-2 dark:bg-green-700 bg-green-900 text-white hover:bg-green-600 dark:hover:bg-green-900 transition hover:-translate-y-1.5 hover:scale-110 rounded-xl text-xl cursor-pointer" onclick={() =>opentab('https://drive.google.com/file/d/1V6OOXFqKCnpJhqI1R36YOPshP1gVBi-Q/view?usp=sharing')}>My Resume</button>
                </div>
                <div class="lg:self-end self-center lg:ml-auto">
                    <img src="/logos/elanngo.jpg" alt="Elanngo Madheswaran photograph" style="min-width: 200px;" class="sm:m-5 md:w-80 w-60 rounded-full">
                </div>
            </div>
        </div>
        
        <!-- skills section -->
         <div id="skills" class="flex flex-col">
            <div class="text-black dark:text-white flex items-center flex-col xl:w-3/4 self-center mb-5 pb-5">
                <h3 class="dark:text-white text-green-900 font-bold text-3xl mx-5 px-5 self-start">Skills</h3>
                <div class="flex flex-wrap sm:mx-5 sm:px-5 justify-center items-center">
                    {#each skills as skillCategory}
                        <SkillBoard {skillCategory} />
                    {/each}
                </div>
            </div>
        </div>
         
    
        <!-- projects section -->
        <div id="projects" class="flex flex-col">
            <div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5 flex flex-col">
                <h3 class="dark:text-white text-green-900 font-bold text-3xl m-5">Projects</h3>
                <div class="self-center lg:w-full sm:w-3/4">
                    <div class="flex flex-wrap justify-center">
                        {#each projects as project}
                            <div class="max-w-sm p-6 rounded-lg shadow bg-green-700 dark:bg-green-900 m-5">
                                <a href="#">
                                    <h4 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{project.name}</h4>
                                </a>
                                <p class="mb-3 font-normal text-slate-100 dark:text-slate-200">{project.description}</p>
                                <a href={project.link} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Live version
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </a>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    
        <!-- contact section -->
        <div class="m-5 flex flex-col" id="contact">
            <div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5">
                <h2 class="dark:text-white text-3xl font-bold  text-green-900">Contact me</h2>
                <div class="flex justify-center"> 
                    <button class="bg-slate-800 p-2 px-5 text-white text-2xl hover:bg-slate-500 rounded-sm m-5" onclick={ () =>opentab('https://github.com/Elanngo-Madheswaran')}>Github</button>
                    <button class="bg-blue-800 p-2 px-5 text-white text-2xl hover:bg-blue-500 rounded-sm m-5" onclick={ () => opentab('https://www.linkedin.com/in/elanngomadheswaran/')}>Linked In</button>
                </div>
            </div>
        </div>
</div>
