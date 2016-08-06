const pngquant = require('imagemin-pngquant');
const assetsFolder = 'assets/';
const imgFolder	= '/' + assetsFolder + 'img/';

module.exports = (gulp, plugins, src, dest) => {
	return () => {
		return gulp.src([
			src + '/**/*.jpg',
			src + '/**/*.jpeg',
			src + '/**/*.png',
			src + '/**/*.svg',
			src + '/**/*.gif',
			'!' + src + '/__jspm-packages/**/*'
		])
			.pipe(plugins.imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				use: [pngquant()]
			}))
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(gulp.dest(dest + imgFolder));
	};
};
