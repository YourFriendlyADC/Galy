/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"nav-text": '#03888F',
				"background": '#D9EEEF',
				"tulip-leaf": '#EDAF76'
			}	
		},
	},
	plugins: [],
}
