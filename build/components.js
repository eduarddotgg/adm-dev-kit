var path			 = require('path');
var inlineImagePath  = require('gulp-inline-image-path');
var htmlreplace		 = require('gulp-html-replace');

var assetsFolder	 = 'assets/';
var cssFolder		 = assetsFolder + 'css/';

var jspmConfig		 = require('posthtml-jspm-config-generator');

var postcssImport	 = require('postcss-import');
var nested			 = require('postcss-nested');
var cssvariables	 = require('postcss-css-variables');
var minmax			 = require('postcss-media-minmax');
var mscale			 = require('postcss-modular-scale');
var grid			 = require('postcss-simple-grid');
var customMedia      = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var font			 = require('postcss-font-magician');
var autoprefixer	 = require('autoprefixer');
var query			 = require('css-mqpacker');
var rebaser			 = require('postcss-assets-rebase');
var csso 			 = require('postcss-csso');
var cssInject		 = require('postcss-inject');


module.exports = function (gulp, plugins, src, dest, cssVars) {
	var processors = [
		postcssImport,
		cssInject({
			injectTo: '',
			cssFilePath: cssVars
		}),
		minmax,
		customMedia,
		nested,
		mscale,
		cssvariables,
		grid({ separator: '--' }),
		rebaser({
			assetsPath: '../img',
			relative: true
		}),
		font
	];

	var postProcess = [
		autoprefixer,
		customProperties,
		query({ sort: true }),
		csso
	];

	return function () {
		return gulp.src(src + '/*.pug')
		.pipe(plugins.flatmap(function (stream, file) {

			// BASE FILE NAME
			var name = path.basename(file.path);

			// CSS
			var cssFileName = name.replace(/\.[^.]*$/i, '.min.css');
			var cssFilePath = 'assets/css/';

			// JS
			var jsFileName = name.replace(/\.[^.]*$/i, '.min.js');
			var jspmFileName = name.replace(/\.[^.]*$/i, '.jspm.js');
			var jsFilePath = 'assets/js/';

			// RETURN STREAM
			return stream

			.pipe(plugins.pug())
			.pipe(plugins.posthtml([
				jspmConfig({
					outputPath: './src/_' + jspmFileName
				})
			]))

			.pipe(plugins.resources())

			.pipe(plugins.if('**/*.css', plugins.postcss(processors, {
				to: './dest/assets/css/*.css'
			})))

			.pipe(plugins.if('**/*.css',
				plugins.concat(cssFolder + cssFileName)))

			.pipe(plugins.if('assets/css/**/*.css',
				plugins.postcss(postProcess)))


			.pipe(plugins.replace(/<link href[^>]+?[ ]*>/g, ''))
			.pipe(plugins.replace(/<script src[^>]+?[ ]*><\/[^>]+?[ ]*>/g, ''))
			.pipe(htmlreplace({
				css: cssFilePath + cssFileName,
				js: jsFilePath + jsFileName
			}))

			.pipe(inlineImagePath({ path: 'assets/img' }));
		}))
		.pipe(gulp.dest(dest));
	};
};
