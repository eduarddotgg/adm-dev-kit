module.exports = (server, fs, path, src) => {
	server.get(['/*.js'], (req, res) => {
		const filePath = path.join(__dirname, src, req.originalUrl);
		const jsFile = fs.readFileSync(filePath);
		res.end(jsFile);
	});
};
