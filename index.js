const express 		= require('express');
const server 		= express();
const path 			= require('path');
const fs 			= require('fs');
const myip 			= require('my-ip');
const open 			= require('open');
const assign		= require('object-assign');

const gulp			= require('gulp');
const $				= require('gulp-load-plugins')();

const pjson 		= require('./package.json');
const serverIP 		= require('./server/ip/ip');
const serverVIEWS 	= require('./server/views/views');
const serverROUTES 	= require('./server/routes/routes');
const serverHTML 	= require('./server/middlewares/html');
const serverJS 		= require('./server/middlewares/javascript');
const serverCSS 	= require('./server/middlewares/css');
const serverIMG 	= require('./server/middlewares/images');
const serverLISTEN 	= require('./server/listen/listen');

exports.server = (opts) => {
	opts = assign({
		src: './src',
		views: './views',
		host: 'adm-dev-kit',
		port: '3000',
		openURL: 'adm-dev-kit',
		name: pjson.name,
		desc: pjson.description,
		version: pjson.version
	}, opts);

	serverIP(server, opts.port);
	serverVIEWS(server, express, path, opts.src, opts.views);
	serverHTML(server);
	serverJS(server, fs, path, opts.src);
	serverCSS(server, path, opts.src);
	serverIMG(server, fs, path, opts.src);
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
};

exports.build = (opts) => {
	opts = assign({
		src: 'src',
		dest: 'dest'
	}, opts);

	function loadTask(task) {
		return require('./build/' + task)(gulp, $, opts.src, opts.dest);
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
