module.exports = (server, express, path, src, views) => {
	server.set('views', path.join(src));
	server.use(express.static(path.join(views)));
};
