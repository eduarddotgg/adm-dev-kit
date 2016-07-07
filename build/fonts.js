var assetsFolder	 = 'assets/';
var fontsFolder		 = '/' + assetsFolder + 'fonts/';

module.exports = function (gulp, plugins, src, dest) {
	return function () {
		return gulp.src([src + '/**/*.woff', src + '/**/*.ttf'])
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(gulp.dest(dest + fontsFolder));
	};
};
