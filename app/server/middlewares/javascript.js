const fs = require('fs');
const path = require('path');

module.exports = (server, src) => {
	server.get(['/*.js'], (req, res) => {
		const filePath = path.join(src, req.originalUrl);
		const jsFile = fs.readFileSync(filePath);
		res.end(jsFile);
	});
};
