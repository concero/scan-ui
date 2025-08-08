import precss from 'precss'
import autoprefixer from 'autoprefixer'
import postcssModules from 'postcss-modules'
import postcssCustomMedia from 'postcss-custom-media'

export default {
	plugins: [
		precss(),
		autoprefixer(),
		postcssCustomMedia(),
		postcssModules({
			generateScopedName: '[name]__[local]__[hash:base64:5]',
		}),
	],
}
