var express      = require('express');
var path         = require('path');
var http         = require('http');
var myIP         = require('my-ip');
var cl           = require('colors');
var injectCode   = require('inject-html');
var pjson        = require('./package.json');

var app          = express();
var address      = myIP();

var pref         = 'http://';
var host         = pjson.host || 'adm-dev-kit';
var port         = pjson.port || 3080;
var bsPort       = pjson.bsport || 3010;
var bsPortUI     = pjson.bsportUI || 3091;



// GET ADMUI STATIC FILES
app.get('/admUI/css/admUI.min.css', function(req, res, next) { res.sendFile(__dirname + '/admUI/css/admUI.min.css'); });
app.get('/admUI/js/jquery-2.1.4.min.js', function(req, res, next) { res.sendFile(__dirname + '/admUI/js/jquery-2.1.4.min.js'); });
app.get('/admUI/js/jquery.qrcode.min.js', function(req, res, next) { res.sendFile(__dirname + '/admUI/js/jquery.qrcode.min.js'); });
app.get('/admUI/js/admUI.js', function(req, res, next) { res.sendFile(__dirname + '/admUI/js/admUI.js'); });


// JS FILES TO BE INJECTED
var injectJsFiles = injectCode({
  code: "<link rel='stylesheet' href='/admUI/css/admUI.min.css'/><script src='/admUI/js/jquery-2.1.4.min.js'></script> <script src='/admUI/js/jquery.qrcode.min.js'></script> <script src='/admUI/js/admUI.js'></script>" 
});

var injectVariables = injectCode({
	code: "<script>$(document).ready(function($){var ip = '"+ address +"'; var port = "+ port +"; var bsPort = "+ bsPort +"; var currentPort = window.location.port; var pathname = window.location.pathname; var hash = window.location.hash; var search = window.location.search; var nodeServerUrl = 'http://' + ip + ':' + port +  pathname + hash + search; var browserSyncUrl = 'http://' + ip + ':' + bsPort + pathname + hash + search; var qrURL = 'http://' + ip + ':' + currentPort + pathname + hash + search; $('.qr-code').qrcode(qrURL);});</script>"
});



// INJECTING HTML
app.use(injectJsFiles);
app.use(injectVariables);



// EXPRESS STATIC
app.use(express.static('./dist'));

try{
	require.resolve("browser-sync");

	var browserSync = require('browser-sync');
	var bs = browserSync({
		proxy: pref + host + ':' + port,
		files:[
			__dirname + '/dist' + '/**/**/**/*.*',
		],
		port: bsPort,
		open: false,
		logLevel: "silent",
	});
	bs(function (err, bs) { if (!err) {} });
} catch(e) {}



// APP LISTEN PORT
app.listen(port, function(res, req){
	console.log('');
	console.log('');
	console.log('ADM DESIGNHOUSE - DEV KIT.');
	console.log('developed and maintained by http://adm-designhouse.com');
	console.log(cl.grey('-------------------------------------------------------'));
	console.log('');
	console.log('');
	console.log(cl.green.underline('Node.js server:'));
	console.log(cl.grey('-------------------------------------------------------'));
	console.log(cl.grey('  Local:       ') + cl.cyan(pref + host + ':' + port));
	console.log(cl.grey('  External:    ') + cl.cyan(pref + address + ':' + port));
	console.log(cl.grey('-------------------------------------------------------'));
	console.log('');
	console.log(cl.green.underline('BrowserSync server:'));
	console.log(cl.grey('-------------------------------------------------------'));
	console.log(cl.grey('  Local:       ') + cl.cyan(pref + host + ':' + bsPort));
	console.log(cl.grey('  External:    ') + cl.cyan(pref + address + ':' + bsPort));
	console.log(cl.grey('-------------------------------------------------------'));
	console.log(cl.grey('  UI local:    ') + cl.cyan(pref + host + ':' + bsPortUI));
	console.log(cl.grey('  UI external: ') + cl.cyan(pref + address + ':' + bsPortUI));
	console.log(cl.grey('-------------------------------------------------------'));
	console.log('');
	console.log('');
});