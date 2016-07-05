const dash = '------------------------';

module.exports = (server, host, port, openURL, myip,
				  open, name, desc, version) => {
	server.listen(port, () => {
		console.log('\n\n' + dash + dash + dash);
		console.log(name + ' ' + version + ' - ' + desc);
		console.log(dash + dash + dash + '\n\n');
		console.log('Access URLs:');
		console.log(dash + dash + dash);
		console.log('Local        : http://' + host + ':' + port);
		console.log('External     : http://' + myip() + ':' + port + '\n\n\n');
		console.log('Server log:');
		console.log(dash + dash + dash + '\n\n');
		open('http://' + openURL + ':' + port + '/');
	});
};
