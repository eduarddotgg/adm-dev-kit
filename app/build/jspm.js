const assetsFolder = 'assets/';
const jsFolder = '/' + assetsFolder + 'js/';

module.exports = (gulp, plugins, src, dest) => {
	return () => {
		return gulp.src(src + '/*.jspm.js')
			.pipe(plugins.jspm({
				minify: true,
				selfExecutingBundle: true
			}))
			.pipe(plugins.rename( (path) => {
				path.basename = path.basename.replace('.bundle.jspm', '');
				path.basename = path.basename.replace('_', '');
			}))
			.pipe(plugins.rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest(dest + jsFolder));
	};
};
