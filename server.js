var express           = require('express');
var morgan            = require('morgan');
var server            = express();
var path              = require('path');
var open              = require("open");
var pjson             = require('./package.json');
var myipui            = require('my-ip-ui');
var timeStamp         = require("console-stamp")(console, { pattern : "HH:MM:ss", label: false});
var dateFormat        = require('dateformat');
var myip              = require('my-ip');


// ENV Settings
var src               = '/webroot';
var pref              = 'http://';
var host              = pjson.host || 'adm-dev-kit'; // package.json
var port              = pjson.port || 3080; // package.json
var openURL           = host; // host or myip()


// PostCSS Plugins
var postcssMiddleware = require('postcss-middleware');
var autoprefixer	  = require('autoprefixer');
var nested		      = require('postcss-nested');
var vars			  = require('postcss-simple-vars');
var minmax		      = require('postcss-media-minmax');
var mscale		      = require('postcss-modular-scale');
var grid			  = require('postcss-simple-grid');

// PostCSS Settings
var cssVariables = '.' + src + '/cssVariables.js';
var postcssPlugins = [
	vars({
		// Update variables whithout server restart.
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


// Injecting QR-Code to every served page
server.use(myipui({ port: port }));

// Static, Views
server.use(express.static(path.join(__dirname, src)));
server.set('views', path.join(__dirname, src));
server.set('view engine', 'jade');
server.set('view cache', false);


// Time
function getTime(){
	var now = new Date();
	var time = '[' + dateFormat(now, "hh:MM:ss") + ']';
	return time;
}

// Express Log
morgan.token("timeStamp", function (req, res) { return getTime() });
server.use(morgan(':timeStamp :method :status :url :response-time ms'));


// Serving "Index Page"
server.get('/', function (req, res) {
	res.render('index');
});

// Serving "Other Pages"
server.get('/:pageUrl', function (req, res) {
	res.render(req.params.pageUrl);
});

// PostCSS Middleware
server.use('/webroot/*.css', postcssMiddleware({
	src: function(req) { return path.join(__dirname, req.originalUrl); },
	plugins: postcssPlugins
}));


// Listen Port
server.listen(port, function(res, req){
	console.log('');
	console.log('');
	console.log('Access URLs:');
	console.log('-------------------------------------------------------');
	console.log('Local        : ' + pref + host + ':' + port);
	console.log('External     : ' + pref + myip() + ':' + port);
	console.log('-------------------------------------------------------');
	console.log('');
	console.log('');

	open(pref + openURL + ':' + port + '/'); // Opens in your default browser
});
