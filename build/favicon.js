module.exports = function (gulp, plugins, src, dest) {
	return function () {
		return gulp.src(src + '/favicon.ico')
			.pipe(gulp.dest(dest));
	};
};
