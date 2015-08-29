var gulp          = require('gulp');
var $             = require('gulp-load-plugins')();
var watch         = require('gulp-watch');

var postcss       = require('gulp-postcss');
var postcssImport = require('postcss-import');
var nested        = require('postcss-nested');
var precss        = require('precss');
var autoprefixer  = require('autoprefixer');
var map           = require('postcss-map');
var minmax        = require('postcss-media-minmax');
var mscale        = require('postcss-modular-scale');
var pxtorem       = require('postcss-pxtorem');
var grid          = require('postcss-simple-grid');
var cssnano       = require('cssnano');


var src = './src';
var root = './webroot/';

var cssMaps = {
	basePath: (src + '/assets/css/'),
	maps: [ 'settings.yml' ]
}

var processors = [
	postcssImport,
	nested,
	map(cssMaps),
	minmax,
	mscale,
	grid,
	pxtorem,
	autoprefixer,
	cssnano
];


gulp.task('connect', function(){
	$.connect.server({
		root: root,
		port: 8888
	});
});

gulp.task('jade', function(){
	gulp.src(src + '/*.jade')
	.pipe($.jade())
	.pipe(gulp.dest(root))
});

gulp.task('jadeWatch', function(){
	gulp.watch([src + '/*.jade',], ['jade'])
});

gulp.task('css', function(){
	gulp.src(src + '/assets/css/*.css')
	.pipe(postcss(processors))
	.pipe(gulp.dest(root + 'assets/css'));
});

gulp.task('cssWatch', function(){
	gulp.watch([src + '/assets/css/*.css'], ['css'])
});

gulp.task('default', ['connect']);
