import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({ out: 'build' }),
		vite: {
			resolve: {
				alias: {
					"@components": path.resolve(`./src/lib/components`),
					"@scripts": path.resolve(`./src/lib/scripts`)
				}
			}
		}
	}
};

export default config;
