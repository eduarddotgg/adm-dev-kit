var express  = require('express');
var pjson    = require('./package.json');

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
			__dirname + '/dest' + '/**/**/**/*.*',
		],
		port: bsPort,
		open: false,
		logLevel: "silent",
	});
	bs(function (err, bs) { if (!err) {} });
} catch(e) {}


// START SERVER ON DEFINED PORT
server.listen(port, function(res, req){
	console.log('Server started!');
});