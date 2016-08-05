const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const vars = require('postcss-css-variables');
const minmax = require('postcss-media-minmax');
const customMedia = require('postcss-custom-media');
const mscale = require('postcss-modular-scale');
const lh = require('postcss-lh');
const grid = require('postcss-simple-grid');
const rebaser = require('postcss-assets-rebase');
const font = require('postcss-font-magician');
const stylelint = require('stylelint');
const customProperties = require('postcss-custom-properties');
const reporter = require('postcss-reporter');
const cssInject = require('postcss-inject');
const query = require('css-mqpacker');
const csso = require('postcss-csso');

exports.dev = (cssVars) => {
	const postcssPlugins = [
		stylelint({
			configFile: './.stylelintrc'
		}),
		reporter({
			clearMessages: true
		}),
		cssInject({
			injectTo: '',
			cssFilePath: cssVars
		}),
		postcssImport,
		mscale,
		lh,
		vars,
		nested,
		minmax,
		customMedia,
		grid({ separator: '--' }),
		autoprefixer
	];

	return postcssPlugins;
};

exports.build = () => {
	const postProcess = [
		font,
		rebaser({
			assetsPath: '../img',
			relative: true
		}),
		customProperties,
		query({ sort: true }),
		csso
	];

	return postProcess;
};
