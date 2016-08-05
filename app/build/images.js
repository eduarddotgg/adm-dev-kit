var pngquant		 = require('imagemin-pngquant');
var assetsFolder	 = 'assets/';
var imgFolder		 = '/' + assetsFolder + 'img/';

module.exports = function (gulp, plugins, src, dest) {
	return function () {
		return gulp.src([src + '/**/*.jpg',
			src + '/**/*.jpeg',
			src + '/**/*.png',
			src + '/**/*.svg',
			src + '/**/*.gif'])
			.pipe(plugins.imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				use: [pngquant()]
			}))
			.pipe(plugins.rename({ dirname: '' }))
			.pipe(gulp.dest(dest + imgFolder));
	};
};
