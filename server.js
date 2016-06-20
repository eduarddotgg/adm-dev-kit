var express           = require('express');
var server            = express();
var fs                = require('fs');
var path              = require('path');
var open              = require('open');
var pjson             = require('./package.json');
var myipui            = require('my-ip-ui');
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
var posthtml          = require('posthtml');
var posthtmlW3C       = require('posthtml-w3c');


// PostCSS Plugins
var postcssMiddleware = require('postcss-middleware');
var autoprefixer      = require('autoprefixer');
var nested            = require('postcss-nested');
var vars              = require('postcss-css-variables');
var minmax            = require('postcss-media-minmax');
var customMedia       = require('postcss-custom-media');
var mscale            = require('postcss-modular-scale');
var grid              = require('postcss-simple-grid');
var stylelint         = require('stylelint');
var reporter          = require('postcss-reporter');
var cssInject         = require('postcss-inject');

// PostCSS Settings
var postcssPlugins = [
	stylelint({
		configFile: './.stylelintrc'
	}),
	reporter({
		clearMessages: true
	}),
	cssInject({
		injectTo: '',
		cssFilePath: 'src/_css-variables.css'
	}),
	mscale,
	vars,
	nested,
	minmax,
	customMedia,
	grid({
		separator: '--'
	}),
	autoprefixer
];


// Injecting QR-Code to every served page
server.use(myipui({ port: port }));


// Static, Views
server.set('views', path.join(__dirname, src));
server.use(express.static(path.join(__dirname, views)));

// FAVICON
server.use(favicon(path.join(__dirname, src, 'favicon.ico')));

// PostHTML with pug
server.engine('pug', function (path, options, callback) {
	// PostHTML plugins
	var plugins = [
		posthtmlW3C()
	];

	var html = require('pug').renderFile(path, options);

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
server.set('view engine', 'pug');
server.set('view cache', false);


// PostCSS Middleware
server.use('/*.css', postcssMiddleware({
	src: function (req) {
		return path.join(__dirname, src, req.originalUrl);
	},
	plugins: postcssPlugins,
	options: {
		map: { inline: true }
	}
}));

// Serving JS
server.get(['/*.js'], function (req, res) {
	var jsFile = fs.readFileSync(path.join(__dirname, src, req.originalUrl));
	res.end(jsFile);
});


// Serving Index Page
server.get('/', function (req, res) {
	res.render('index');
});

// Serving Other Pages
server.get('/:pageUrl', function (req, res) {
	res.render(req.params.pageUrl);
});

// Serving Images
server.get(['/*.ico', '/*.jpeg', '/*.jpg', '/*.png', '/*.svg'], function (req, res) {
	var img = fs.readFileSync(path.join(__dirname, src, req.originalUrl));
	res.end(img);
});


// Listen Port
server.listen(port, function () {
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
