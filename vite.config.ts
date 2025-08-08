import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import precss from 'precss'
import stylelint from 'vite-plugin-stylelint'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	plugins: [
		react(),
    devtoolsJson(),
		tsconfigPaths(),
		dts({ tsconfigPath: './tsconfig.app.json' }),
		cssInjectedByJsPlugin(),
		stylelint({
			fix: true,
			include: ['./src/**/*.css', './src/**/*.pcss'],
			configFile: './.stylelintrc.json',
			emitErrorAsWarning: true,
		}),
	],
	css: {
		postcss: {
			plugins: [precss()],
		},
	}
})