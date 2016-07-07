module.exports = function (gulp, plugins, src) {
	return function () {
		return gulp.src(src + '/*.jspm.js')
			.pipe(plugins.jspm({
				minify: true,
				selfExecutingBundle: true
			}))
			.pipe(plugins.rename(function (path) {
				path.basename = path.basename.replace('.bundle.jspm', '');
				path.basename = path.basename.replace('_', '');
			}))
			.pipe(plugins.rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('dest/assets/js'));
	};
};
