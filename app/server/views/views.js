const path = require('path');

module.exports = (server, express, src, views) => {
	server.set('views', path.join(src));
	server.use(express.static(path.join(views)));
};
