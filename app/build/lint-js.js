module.exports = (gulp, plugins, src) => {
	return () => {
		return gulp.src([
			'./_server/**/*.js',
			src + '/**/*.js',
			'!' + src + '/__jspm_packages/**/*.js',
			'!' + src + '/_jspm-config.js',
			'!' + src + '/**/*.jspm.js'
			])
			.pipe(plugins.changed(src + '/**/*.js'))
			.pipe(plugins.eslint({
				configFile: './.eslintrc'
			}))

			.pipe(plugins.eslint.result( (result) => {
				console.log('ESLint result: ' + result.filePath);
				console.log('# Messages: ' + result.messages.length);
				console.log('# Warnings: ' + result.warningCount);
				console.log('# Errors: ' + result.errorCount);
			}))
			.pipe(plugins.eslint.format())
			.pipe(plugins.eslint.failOnError());
	};
};
