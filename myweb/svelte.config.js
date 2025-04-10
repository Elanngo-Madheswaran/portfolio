import adapter from '@sveltejs/adapter-vercel';

const config = { kit: { 
    adapter: adapter(),
    alias : {
        $components: 'src/lib/components'
    }
 } };

export default config;
