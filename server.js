var express  = require('express');
var open     = require("open");
var pjson    = require('./package.json');

require("console-stamp")(console, {
	pattern : "HH:MM:ss",
	label: false
});

var server   = express();

var pref     = 'http://';
var host     = pjson.host || 'adm-dev-kit';
var port     = pjson.port || 3080;
var bsPort   = pjson.bsport || 3010;
var bsPortUI = pjson.bsportUI || 3091;


// EXPRESS STATIC
server.use(express.static('./dest'));


// BROWSER SYNC
try{
	require.resolve('browser-sync');

	var browserSync = require('browser-sync');
	var bs = browserSync({
		proxy: pref + host + ':' + port,
		files:[
			__dirname + '/dest' + '/**/**/**/*.html',
			__dirname + '/dest' + '/**/**/**/*.js',
			__dirname + '/dest' + '/**/**/**/*.css',
		],
		port: bsPort,
		open: false,
		logLevel: "silent",
	});
	bs(function (err, bs) { if (!err) {} });
} catch(e) {}


// START SERVER ON DEFINED PORT
server.listen(port, function(res, req){
	console.log('');
	console.log('');
	console.log('Server started!');
	console.log('-------------------------------------------------------');
	console.log('HTTP Server        : ' + pref + host + ':' + port);
	console.log('BrowserSync Server : ' + pref + host + ':' + bsPort);
	console.log('-------------------------------------------------------');
	console.log('');
	console.log('');
	open(pref + host + ':' + port);
})
.on('error',function(err){
	if (err.code === 'EADDRINUSE'){
		port++;
		// bsPort++;
		console.log('');
		console.log('');
		console.log('Address in use');
		console.log('Retrying on ' + pref + host + ':' + port);
		console.log('');
		console.log('');
		setTimeout(function () {
			server.listen(port);
		}, 250);
	}
});