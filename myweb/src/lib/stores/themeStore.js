import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// Initialize theme from localStorage or default to 'dark'
const initialTheme = browser && localStorage.getItem('theme') || 'dark';

// Create the theme store
export let theme = writable(initialTheme);

// Apply initial theme if in browser
if (browser) {
    // Apply initial theme to document
    if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Subscribe to theme changes
    theme.subscribe((value) => {
        // Save theme preference to localStorage
        localStorage.setItem('theme', value);
        
        // Apply theme to document
        if (value === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
}

// Function to toggle theme
export function toggleTheme() {
    theme.update(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
}