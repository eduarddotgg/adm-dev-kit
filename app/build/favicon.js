module.exports = (gulp, plugins, src, dest) => {
	return () => {
		return gulp.src(src + '/favicon.ico')
			.pipe(gulp.dest(dest));
	};
};
