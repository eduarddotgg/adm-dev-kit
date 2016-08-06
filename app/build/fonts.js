const assetsFolder = 'assets/';
const fontsFolder = '/' + assetsFolder + 'fonts/';

module.exports = (gulp, plugins, src, dest) => {
	return () => {
		return gulp.src([
			src + '/**/*.woff',
			src + '/**/*.ttf',
			'!' + src + '/__jspm-packages/**/*'
		])
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(gulp.dest(dest + fontsFolder));
	};
};
