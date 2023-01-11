import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      fallback: '200.html'
    }),
    prerender: { entries: [] },
    alias: {
      '@src': 'src'
    },
    paths: {
      base: dev ? '' : '/megaresume'
    }
  }
};

export default config;
