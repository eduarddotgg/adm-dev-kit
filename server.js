var express           = require('express');
var morgan            = require('morgan');
var server            = express();
var path              = require('path');
var open              = require("open");
var pjson             = require('./package.json');
var myipui            = require('my-ip-ui');
var timeStamp         = require("console-stamp");
var dateFormat        = require('dateformat');


var src               = '/webroot';
var pref              = 'http://';
var host              = pjson.host || 'adm-dev-kit';
var port              = pjson.port || 3080;


// PostCSS PLUGINS
var postcssMiddleware = require('postcss-middleware');
var autoprefixer	  = require('autoprefixer');
var nested		      = require('postcss-nested');
var vars			  = require('postcss-simple-vars');
var minmax		      = require('postcss-media-minmax');
var mscale		      = require('postcss-modular-scale');
var grid			  = require('postcss-simple-grid');

// PostCSS SETTINGS
var cssVariables = '.' + src + '/cssVariables.js';

var postcssPlugins = [
	vars({
		variables: function(){
			delete require.cache[require.resolve(cssVariables)];
			return require(cssVariables);
		},
		silent: true,
		unknown: function (node, name, result) {
			node.warn(result, 'Unknown variable ' + name);
		}
	})
	, nested
	, minmax
	, mscale
	, grid({separator: '--'})
	, autoprefixer
];


// SEVER
server.use(myipui({ port: port }));

// SERVER STATIC
server.use(express.static(path.join(__dirname, src)));
server.set('views', path.join(__dirname, src));
server.set('view engine', 'jade');
server.set('view cache', false);


// TIMESTAMP
function getTime(){
	var now = new Date();
	var time = '[' + dateFormat(now, "hh:MM:ss") + ']';
	return time;
}

// LOG
morgan.token("timeStamp", function (req, res) { return getTime() });
server.use(morgan(':timeStamp :method :status :url :response-time ms'));

server.get('/', function (req, res) {
	res.render('index');
});

server.get('/:pageUrl', function (req, res) {
	var pageUrl = req.params.pageUrl;
	
	res.render(pageUrl);
});

server.use('/webroot/*.css', postcssMiddleware({

	src: function(req) {
		return path.join(__dirname, req.originalUrl);
	},
	plugins: postcssPlugins
}));


timeStamp(console, {
	pattern : "HH:MM:ss",
	label: false
});


// START SERVER ON DEFINED PORT
server.listen(port, function(res, req){
	console.log('');
	console.log('');
	console.log('Server started!');
	console.log('-------------------------------------------------------');
	console.log('HTTP Server        : ' + pref + host + ':' + port);
	console.log('-------------------------------------------------------');
	console.log('');
	console.log('');
	open(pref + host + ':' + port);
});
