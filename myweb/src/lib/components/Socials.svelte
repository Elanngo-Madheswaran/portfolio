<script>
    let { socialLinks } = $props();
</script>

<div class="xl:w-3/4 self-center w-full sm:m-5 sm:p-5 flex flex-col">
    <h3 class="dark:text-white text-green-900 font-bold text-3xl m-5">Socials</h3>
    <ul class="flex flex-wrap justify-center align-middle wrapper">
        {#each socialLinks as link}
            <a href="{link.href}" target="_blank" rel="noopener noreferrer">
                <li class="icon m-5 md:w-25 md:h-25 w-15 h-15 rounded-full bg-green-900">
                    <span class="tooltip text-black bg-white">{link.tooltip}</span>
                    <img src={link.icon} alt={link.tooltip} class="md:w-15 md:h-15 w-10 h-10"  />
                </li>
            </a>
        {/each}
    </ul>
</div>

<style>

.wrapper .icon {
  position: relative;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background: #fff;
  bottom: -3px;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}


</style>