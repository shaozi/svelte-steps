import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  // preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html

    adapter: adapter({
      fallback: 'index.html', // may differ from host to host
    }),
  },
}

export default config
