const fileTypes = ['/*.ico', '/*.jpeg', '/*.jpg', '/*.png', '/*.svg'];

module.exports = (server, fs, path, src) => {
	server.get(fileTypes, (req, res) => {
		const filePath = path.join(src, req.originalUrl);
		const img = fs.readFileSync(filePath);
		res.end(img);
	});
};
