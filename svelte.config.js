import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		preprocess({
			sourceMap: true
		})
	],
	kit: {
		paths: {
			base: '/hello'
		},
		adapter: adapter(),
		alias: {
			$src: './src',
			$lib: './src/lib'
		}
	},
	compilerOptions: {
		enableSourcemap: true
	},
	vitePlugin: {
		inspector: {
			// hold and release key to toggle inspector mode
			holdMode: true,
			// show or hide the inspector option
			showToggleButton: 'always',
			// inspector position
			toggleButtonPos: 'bottom-left'
		}
	}
};

export default config;
