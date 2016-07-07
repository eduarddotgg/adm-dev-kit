const postcssMiddleware = require('postcss-middleware');
const autoprefixer      = require('autoprefixer');
const nested            = require('postcss-nested');
const vars              = require('postcss-css-variables');
const minmax            = require('postcss-media-minmax');
const customMedia       = require('postcss-custom-media');
const mscale            = require('postcss-modular-scale');
const grid              = require('postcss-simple-grid');
const stylelint         = require('stylelint');
const reporter          = require('postcss-reporter');
const cssInject         = require('postcss-inject');


const postcssPlugins = [
	stylelint({
		configFile: './.stylelintrc'
	}),
	reporter({
		clearMessages: true
	}),
	cssInject({
		injectTo: '',
		cssFilePath: './src/_css-variables.css'
	}),
	mscale,
	vars,
	nested,
	minmax,
	customMedia,
	grid({
		separator: '--'
	}),
	autoprefixer
];

module.exports = (server, path, src) => {
	server.use('/*.css', postcssMiddleware({
		src: (req) => {
			return path.join(src, req.originalUrl);
		},
		plugins: postcssPlugins,
		options: {
			map: { inline: true }
		}
	}));
};
