var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var watch = require('gulp-watch');

var src = './src';
var root = './webroot/';


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
	var processors = [];
	gulp.src(src + '/assets/css/*.css')
	.pipe($.postcss(processors))
	.pipe(gulp.dest(root + 'assets/css/'))
});

gulp.task('cssWatch', function(){
	gulp.watch([src + '/assets/css/*.css'], ['css'])
});

gulp.task('default', ['connect']);
