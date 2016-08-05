const fs = require('fs');
const path = require('path');
const fileTypes = ['/*.ico', '/*.jpeg', '/*.jpg', '/*.png', '/*.svg'];

module.exports = (server, src) => {
	server.get(fileTypes, (req, res) => {
		const filePath = path.join(src, req.originalUrl);
		const img = fs.readFileSync(filePath);
		res.end(img);
	});
};
