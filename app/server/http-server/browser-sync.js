const browserSync = require('browser-sync');

module.exports = (host, port, src, name) => {
	browserSync({
		proxy: host + ':' + port,
		files: [
			src + '/**/*.pug',
			'!' + src + '/**/*.jspm.js',
			src + '/**/*.js',
			src + '/**/*.css'
		],
		logPrefix: name,
		open: false
	});
};
