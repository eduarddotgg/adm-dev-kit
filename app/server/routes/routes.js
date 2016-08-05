module.exports = (server) => {
	server.get('/', (req, res) => {
		res.render('index');
	});
	server.get('/:pageUrl', (req, res) => {
		res.render(req.params.pageUrl);
	});
};
