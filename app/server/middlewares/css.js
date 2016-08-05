const path = require('path');
const postcssMiddleware = require('postcss-middleware');
const postcssConfig = require('../../postcss-config');

module.exports = (server, src, cssVars) => {
	server.use('/*.css', postcssMiddleware({
		src: (req) => {
			return path.join(src, req.originalUrl);
		},
		plugins: postcssConfig.dev(cssVars),
		options: {
			map: { inline: true }
		}
	}));
};
