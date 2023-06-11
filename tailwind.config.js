import { createThemes } from 'tw-colors';
import { palettes } from './src/lib/palettes';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [createThemes(palettes)]
};
