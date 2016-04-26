var express           = require('express');
var server            = express();
var morgan            = require('morgan');
var fs                = require('fs');
var path              = require('path');
var open              = require("open");
var pjson             = require('./package.json');
var myipui            = require('my-ip-ui');
// var timeStamp      = require("console-stamp")(console, { pattern : "HH:MM:ss", label: false});
var dateFormat        = require('dateformat');
var myip              = require('my-ip');
var favicon           = require('serve-favicon');


// ENV Settings
var src               = 'src';
var views             = 'webroot';
var pref              = 'http://';
var host              = pjson.host || 'adm-dev-kit'; // package.json
var port              = pjson.port || 3080; // package.json
var openURL           = host; // host or myip()


// PostHTML Plugins
var posthtml          = require ('posthtml');
var posthtmlW3C       = require('posthtml-w3c');


// PostCSS Plugins
var postcssMiddleware = require('postcss-middleware');
var autoprefixer      = require('autoprefixer');
var nested            = require('postcss-nested');
var vars              = require('postcss-simple-vars');
var minmax            = require('postcss-media-minmax');
var mscale            = require('postcss-modular-scale');
var grid              = require('postcss-simple-grid');
var stylelint         = require("stylelint");
var reporter          = require("postcss-reporter");

// PostCSS Settings
var cssVariables   = path.join(__dirname, src, '_cssVariables.js');
var postcssPlugins = [
	stylelint({
		configFile: './.stylelintrc'
	}),
	reporter({clearMessages: true})
	, vars({
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


// Time
function getTime(){
	var now = new Date();
	var time = '[' + dateFormat(now, "hh:MM:ss") + ']';
	return time;
}

// Express Log
// morgan.token("showTime", function (req, res) { return getTime() });
// server.use(morgan(':showTime :method :status :url :response-time ms'));


// Static, Views
server.set('views', path.join(__dirname, src));
server.use(express.static(path.join(__dirname, views)));

// FAVICON
server.use(favicon(path.join(__dirname, src, 'favicon.ico')));

// PostHTML with Jade
server.engine('jade', function (path, options, callback) {
	// PostHTML plugins
	var plugins = [
		posthtmlW3C()
	];

	var html = require('jade').renderFile(path, options);

	posthtml(plugins)
		.process(html)
		.then(function (result) {
			if (typeof callback === 'function') {
				var res;
				try {
					res = result.html;
				} catch (ex) {
					return callback(ex);
				}
				return callback(null, res);
			}
		});
});
server.set('view engine', 'jade');
server.set('view cache', false);


// PostCSS Middleware
server.use('/*.css', postcssMiddleware({
	src: function(req) { return path.join(__dirname, src, req.originalUrl); },
	plugins: postcssPlugins
}));


// Serving "Index Page"
server.get('/', function (req, res) {
	res.render('index');
});

// Serving "Other Pages"
server.get('/:pageUrl', function (req, res) {
	res.render(req.params.pageUrl);
});

// Serving Images
server.get(['/*.ico', '/*.jpeg', '/*.jpg', '/*.png', '/*.svg'], function(req, res){
	var img = fs.readFileSync(path.join(__dirname, src, req.originalUrl));
	res.end(img);
});


// Listen Port
server.listen(port, function(res, req){
	console.log('-----------------------------------------------------------------');
	console.log('DEV KIT - Component Driven Static Website Development Tool');
	console.log('-----------------------------------------------------------------');
	console.log('');
	console.log('');
	console.log('Access URLs:');
	console.log('-----------------------------------------------------------------');
	console.log('Local        : ' + pref + host + ':' + port);
	console.log('External     : ' + pref + myip() + ':' + port);
	console.log('');
	console.log('');
	console.log('');
	console.log('');
	console.log('');
	console.log('Server log:');
	console.log('-----------------------------------------------------------------');
	console.log('');
	console.log('');

	open(pref + openURL + ':' + port + '/'); // Opens in your default browser
});
