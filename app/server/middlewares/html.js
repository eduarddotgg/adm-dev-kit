const posthtml = require('posthtml');
const posthtmlW3C = require('posthtml-w3c');


module.exports = (server) => {
	server.engine('pug', (path, options, callback) => {

		const plugins = [
			posthtmlW3C()
		];

		const html = require('pug').renderFile(path, options);

		posthtml(plugins)
			.process(html)
			.then( (result) => {
				if (typeof callback === 'function') {
					let res;
					try {
						res = result.html;
					} catch (ex) {
						return callback(ex);
					}
					return callback(null, res);
				} else {
					return result;
				}
			});
	});

	server.set('view engine', 'pug');
	server.set('view cache', false);
};
