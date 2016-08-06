const stylelint = require('stylelint');
const reporter = require('postcss-reporter');

module.exports = (gulp, plugins, src)  => {
	return ()  => {
		return gulp.src([
			src + '/**/*.css',
			'!' + src + '/__jspm_packages/**/*.css'
		])
		.pipe(plugins.changed(src + '/**/*.css'))
		.pipe(plugins.postcss([
			stylelint({
				configFile: './.stylelintrc'
			}),
			reporter({
				clearMessages: true,
				throwError: true
			})
		]));
	};
};
