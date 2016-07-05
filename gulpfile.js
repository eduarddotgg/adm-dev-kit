var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var src = 'src';
var dest = 'dest';

function loadTask(task) {
	return require('./_build/' + task)(gulp, $, src, dest);
}

// Load Tasks
gulp.task('components', loadTask('_gulp-components'));
gulp.task('jspm', loadTask('_gulp-jspm'));
gulp.task('images', loadTask('_gulp-images'));
gulp.task('favicon', loadTask('_gulp-favicon'));
gulp.task('fonts', loadTask('_gulp-fonts'));
gulp.task('lintJS', loadTask('_gulp-lint-js'));
gulp.task('lintCSS', loadTask('_gulp-lint-css'));

// Default Task
gulp.task('default', ['components', 'jspm', 'images', 'favicon', 'fonts']);
gulp.task('lint', ['lintJS', 'lintCSS']);
