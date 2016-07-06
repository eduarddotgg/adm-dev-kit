const myipui = require('my-ip-ui');

module.exports = (server, port) => {
	server.use(myipui({ port: port }));
};
