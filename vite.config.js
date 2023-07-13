import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		port: 1337,
	},
	css: {
		postcss: {
			plugins: [
				autoprefixer({}), // add options if needed
			],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@composables': path.resolve(__dirname, './src/composables'),
			'@handler': path.resolve(__dirname, './src/handler'),
			'@util': path.resolve(__dirname, './src/util'),
			'@node_modules': path.resolve(__dirname, './node_modules'),
		},
	},
});
