<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { toggleTheme } from "$lib/stores/themeStore";
  
  let menuToggle;
  let menu;
  
  let currentPath = $state($page.url.pathname);
  
  onMount(() => {
    menuToggle = document.querySelector('[data-collapse-toggle="navbar-default"]');
    menu = document.getElementById('navbar-default');
  
    menuToggle.addEventListener('click', toggleMenu);
  
    return () => {
    menuToggle.removeEventListener('click', toggleMenu);
    };
  });
  
  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  
    menu.classList.toggle('hidden', isExpanded);
    menu.classList.toggle('flex', !isExpanded);
    menu.classList.toggle('flex-col', !isExpanded);
    menu.classList.toggle('items-center', !isExpanded);
    menu.classList.toggle('justify-center', !isExpanded);
    menu.classList.toggle('space-y-4', !isExpanded);
  }
  
  
</script>
  
<nav class="bg-white border-gray-200 dark:bg-gray-900 flex justify-center">
  <div class="max-w-screen-2xl w-full flex flex-wrap items-center justify-between sm:p-4 p-2">
  <div class="flex">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
    <span class="self-center sm:text-2xl text-lg font-semibold whitespace-nowrap dark:text-white">
      Elanngo Madheswaran
    </span>
    </a>
    <div class="flex dark:bg-gray-800 ms-5">
    <button
      onclick={toggleTheme}
      class="w-8 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      tabindex="0"
      role="switch"
      aria-checked="false"
      id="darkModeToggle"
    >
      <svg class="fill-lime-800 block dark:hidden" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg class="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        fill-rule="evenodd"
        clip-rule="evenodd"
      ></path>
      </svg>
      <span class="sr-only">Switch between dark and light mode</span>
    </button>
    </div>
  </div>

  {#if currentPath.startsWith('/blogs')}
    <!-- Simple navigation for blog page -->
     
  {:else}
    <!-- Toggle button for mobile menu - only shown on main page -->
    <button
    data-collapse-toggle="navbar-default"
    type="button"
    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    aria-controls="navbar-default"
    aria-expanded="false"
    >
    <span class="sr-only">Open main menu</span>
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
    </svg>
    </button>

    <!-- Full navigation for main page -->
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:items-center">
      <li>
      <a href="/" onclick={toggleMenu} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-[#00ff00] dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
      </li>
      <li>
      <a href="#skills" onclick={toggleMenu} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-[#00ff00] dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent">Skills</a>
      </li>
      <li>
      <a href="#projects" onclick={toggleMenu} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-[#00ff00] dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent">Projects</a>
      </li>
      <li>
      <a href="#contact" onclick={toggleMenu} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-[#00ff00] dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
      </li>
      <li>
      <a href="/blogs" onclick={toggleMenu} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-[#00ff00] dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent">Blogs</a>
      </li>
    </ul>
    </div>
  {/if}
  </div>
</nav>