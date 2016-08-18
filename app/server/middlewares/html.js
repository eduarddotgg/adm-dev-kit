const posthtml = require('posthtml');
const posthtmlW3C = require('posthtml-w3c');
const jspmConfig = require('posthtml-jspm-config-generator');

module.exports = (server, src) => {
	server.engine('pug', (path, options, callback) => {

		const fileName = path.match(/[^/]+$/g);
		const jspmFileName = fileName[0].replace('.pug', '.jspm');

		const plugins = [
			posthtmlW3C(),
			jspmConfig({
				outputPath: src + '/_' + jspmFileName
			})
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
