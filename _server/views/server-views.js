module.exports = (server, express, path, src, views) => {
	server.set('views', path.join(__dirname, src));
	server.use(express.static(path.join(__dirname, views)));
};
