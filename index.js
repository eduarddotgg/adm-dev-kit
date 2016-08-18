const express = require('express');
const server = express();
const myip = require('my-ip');
const open = require('open');
const assign = require('object-assign');

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const pjson = require('./package.json');
const serverIP = require('./app/server/ip/ip');
const serverVIEWS = require('./app/server/views/views');
const serverROUTES = require('./app/server/routes/routes');
const serverHTML = require('./app/server/middlewares/html');
const serverJS = require('./app/server/middlewares/javascript');
const serverCSS = require('./app/server/middlewares/css');
const serverIMG = require('./app/server/middlewares/images');
const serverLISTEN = require('./app/server/http-server/listen');
const serverBrowserSync = require('./app/server/http-server/browser-sync');

exports.server = (opts) => {
	opts = assign({
		src: './src',
		views: './views',
		host: 'localhost',
		port: '3000',
		openURL: 'localhost',
		name: pjson.name,
		desc: pjson.description,
		version: pjson.version,
		browserSync: true,
		cssVariables: './src/_css-variables.css'
	}, opts);

	serverIP(server, opts.port);
	serverVIEWS(server, express, opts.src, opts.views);
	serverHTML(server, opts.src);
	serverJS(server, opts.src);
	serverCSS(server, opts.src, opts.cssVariables);
	serverIMG(server, opts.src);
	serverROUTES(server);
	serverLISTEN(server,
		opts.host,
		opts.port,
		opts.openURL,
		myip,
		open,
		opts.name,
		opts.desc,
		opts.version);
	if (opts.browserSync) {
		serverBrowserSync(opts.host, opts.port, opts.src, opts.name);
	}
};

exports.build = (opts) => {
	opts = assign({
		src: 'src',
		dest: 'dest',
		cssVariables: './src/_css-variables.css'
	}, opts);

	function loadTask(task) {
		return require('./app/build/' +
			task)(gulp, $, opts.src, opts.dest, opts.cssVariables);
	}

	gulp.task('components', loadTask('components'));
	gulp.task('jspm', loadTask('jspm'));
	gulp.task('images', loadTask('images'));
	gulp.task('favicon', loadTask('favicon'));
	gulp.task('fonts', loadTask('fonts'));
	gulp.task('lintJS', loadTask('lint-js'));
	gulp.task('lintCSS', loadTask('lint-css'));

	gulp.task('default', ['components', 'jspm', 'images', 'favicon', 'fonts']);
	gulp.task('lint', ['lintJS', 'lintCSS']);
};
