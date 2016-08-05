var path			 = require('path');
var inlineImagePath  = require('gulp-inline-image-path');
var htmlreplace		 = require('gulp-html-replace');

var assetsFolder	 = 'assets/';
var cssFolder		 = assetsFolder + 'css/';

var jspmConfig		 = require('posthtml-jspm-config-generator');
const postcssConfig = require('../postcss-config');

module.exports = function (gulp, plugins, src, dest, cssVars) {
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

			.pipe(plugins.if('**/*.css', plugins.postcss(postcssConfig.dev(cssVars),
				{ to: './dest/assets/css/*.css' }
			)))

			.pipe(plugins.if('**/*.css',
				plugins.concat(cssFolder + cssFileName)))

			.pipe(plugins.if('assets/css/**/*.css',
				plugins.postcss(postcssConfig.build())))


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
