const fs = require('fs');
const path = require('path');
const fileTypes = ['/*.ico', '/*.jpeg', '/*.jpg', '/*.png', '/*.svg'];

module.exports = (server, src) => {
	server.use(fileTypes, (req, res) => {
		const filePath = path.join(src, req.originalUrl);
		res.sendFile(filePath, {root: './'});
	});
};
