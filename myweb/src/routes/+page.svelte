<script>
    import "../app.css";
    import { SkillBoard , Navbar , Socials } from "$components";
    import { onMount } from "svelte";
    import {theme} from '$lib/stores/themeStore'

    function opentab(url) {
        window.open(url, '_blank');
    }

    let isDark = $state(true); 
    let skills = [
        {
            category: "Front End",
            items: [
                { name: "Next.js", icon: "https://profilinator.rishav.dev/skills-assets/nextjs.png" },
                { name: "React", icon: "https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" },
                { name: "Angular", icon: "https://profilinator.rishav.dev/skills-assets/angularjs-original.svg" },
                { name: "Bootstrap", icon: "https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" },
                { name: "Node.js", icon: "https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" },
                { name: "TypeScript", icon: "https://profilinator.rishav.dev/skills-assets/typescript-original.svg" },
                { name: "Tailwind CSS", icon: "https://profilinator.rishav.dev/skills-assets/tailwindcss.svg" },
                { name: "Svelte", icon: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" },
                { name: "HTMX" , icon: "https://upload.wikimedia.org/wikipedia/commons/c/c4/SVGmix-XRp12W-htmx.svg"}
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
    let projects = [{
                        name: "Monty hall Simulator",
                        description: "Monty hall problem simulator made using svelte with mongodb integration for storing statistics",
                        link: "https://elanngo-monty-hall.vercel.app/"
                    },
                    {
                        name: "Minesweeper game",
                        description: "Minesweeper game made using svelte leveraging its reactive states and components",
                        link: "https://mines-elanngo.vercel.app/"

                    },
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

    let socialLinks = [
        { href: "mailto:elanngo@disroot.org", ariaLabel: "Email", icon: "/logos/gmail.png" , tooltip :"Mail"},
        { href: "https://www.linkedin.com/in/elanngomadheswaran/", ariaLabel: "LinkedIn", icon: "/logos/linkedin.png" , tooltip:"LinkedIn" },
        { href: "https://github.com/elanngo-madheswaran", ariaLabel: "GitHub", icon: "/logos/github.png", tooltip:"Github" }
    ];

    function toggleDarkMode() {
        isDark = !isDark;
    }
    
let status = $state("");
let { form , data } = $props();
            
</script>

<svelte:head>
    <title>Elanngo Madheswaran's Portfolio | Portfolio</title>
</svelte:head>

<div class="bg-white dark:bg-black selection:bg-green-700 selection:text-white {theme == 'dark' ? 'dark' : ''} transition duration-700 ease-in-out h-full">
        <header class="fixed w-full z-20 top-0 start-0">
            <!-- top nav bar -->
            <Navbar />
            
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
         <section id="skills" class="flex flex-col">
            <div class="text-black dark:text-white flex items-center flex-col xl:w-3/4 self-center mb-5 pb-5">
                <h3 class="dark:text-white text-green-900 font-bold text-3xl mx-5 px-5 self-start">Skills</h3>
                <div class="flex flex-wrap sm:mx-5 sm:px-5 justify-center items-center">
                    {#each skills as skillCategory}
                        <SkillBoard {skillCategory} />
                    {/each}
                </div>
            </div>
        </section>
         
    
        <!-- projects section -->
        <section id="projects" class="flex flex-col">
            <div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5 flex flex-col">
                <h3 class="dark:text-white text-green-900 font-bold text-3xl m-5">Projects</h3>
                <div class="self-center lg:w-full sm:w-3/4">
                    <div class="flex flex-wrap justify-center">
                        {#each projects as project}
                            <div class="max-w-sm p-6 rounded-lg shadow bg-green-700 dark:bg-green-900 m-5">
                                <h4 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{project.name}</h4>
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
        </section>
    
        <!-- contact section -->
        <section id="contact" class="flex flex-col">
            <div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5 flex flex-col">
                    <h3 class="dark:text-white text-green-900 font-bold text-3xl m-5">Contact Me</h3>
                    <form method="POST" class="flex flex-col bg-green-700 dark:bg-green-950 p-6 rounded-lg shadow text-white md:w-3/4 w-full self-center">
                        {#if form?.error}
                        <p class="text-red-400 mb-3">I am expirencing few issues, Please try again later or email directly through <a href="mailto:elanngo@disroot.org" class="text-blue-400">elanngo@disroot.org</a></p>
                        {/if}
                        {#if form?.success == true}
                            <p class="text-green-300 mb-3">Mail Sent Successfully , I will contact you within 48 hours.</p>
                        {:else}
                            <label for="name" class="mb-2 font-bold text-xl">Name</label>
                            <input id="name" type="text" name="name" required class="mb-4 p-2 rounded-lg text-black dark:text-black dark:bg-gray-300 bg-white" />
                            
                            <label for="email" class="mb-2 font-bold text-xl">Email</label>
                            <input id="email" type="email" name="email" required class="mb-4 p-2 rounded-lg text-black dark:text-black dark:bg-gray-300 bg-white" />
                            
                            <label for="company" class="mb-2 font-bold text-xl">Company</label>
                            <input id="company" type="text" name="company" class="mb-4 p-2 rounded-lg text-black dark:text-black dark:bg-gray-300 bg-white" />
                            
                            <label for="message" class="mb-2 font-bold text-xl">Message</label>
                            <textarea id="message" name="message" required rows="3" class="mb-4 p-2 rounded-lg text-black dark:text-black dark:bg-gray-300 bg-white"></textarea>
                            <input type="submit" value="Send" class="w-48 p-2 bg-blue-700 text-white hover:bg-blue-800 transition hover:-translate-y-1.5 hover:scale-110 rounded-xl text-xl cursor-pointer" />
                        {/if}
                    </form>
                </div>
            </section>

            <!-- Social links -->
    <section id="social-links" class="flex flex-col">
        <Socials {socialLinks} />
    </section>

</div>