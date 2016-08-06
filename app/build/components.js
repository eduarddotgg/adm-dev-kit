const path = require('path');
const inlineImagePath = require('gulp-inline-image-path');
const htmlreplace = require('gulp-html-replace');
const postcssConfig = require('../postcss-config');

const assetsFolder = 'assets/';
const cssFolder = assetsFolder + 'css/';

module.exports = (gulp, plugins, src, dest, cssVars) => {
	return () => {
		return gulp.src(src + '/*.pug')
		.pipe(plugins.flatmap( (stream, file) => {

			// BASE FILE NAME
			const name = path.basename(file.path);

			// CSS
			const cssFileName = name.replace(/\.[^.]*$/i, '.min.css');
			const cssFilePath = 'assets/css/';

			// JS
			const jsFileName = name.replace(/\.[^.]*$/i, '.min.js');
			const jsFilePath = 'assets/js/';

			// RETURN STREAM
			return stream

			.pipe(plugins.pug())

			.pipe(plugins.resources())

			.pipe(plugins.if('**/*.css', plugins.postcss(
				postcssConfig.dev(cssVars),
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
