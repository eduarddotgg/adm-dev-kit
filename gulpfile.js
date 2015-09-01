var gulp             = require('gulp');
var $                = require('gulp-load-plugins')();
var watch            = require('gulp-watch');
var args             = require('yargs').argv;
var gulpif           = require('gulp-if');
var del              = require('del');
var pngquant         = require('imagemin-pngquant');
var runSequence      = require('run-sequence');
var cmq              = require('gulp-combine-media-queries');

var postcss          = require('gulp-postcss');
var customProperties = require('postcss-custom-properties');
var postcssImport    = require('postcss-import');
var nested           = require('postcss-nested');
var precss           = require('precss');
var autoprefixer     = require('autoprefixer');
var map              = require('postcss-map');
var minmax           = require('postcss-media-minmax');
var mscale           = require('postcss-modular-scale');
var pxtorem          = require('postcss-pxtorem');
var grid             = require('postcss-simple-grid');
var cssnano          = require('cssnano');

var isProduction  = args.env === 'production';

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
	customProperties,
	autoprefixer,
	cssnano
];


// CLEAN
gulp.task('clean', function (cb) {
	del([root + '*'], cb);
});

// SIMPLE HTML SERVER
gulp.task('connect', function(){
	$.connect.server({
		root: root,
		port: 8888
	});
});


// JADE TO HTML
gulp.task('jade', function(){
	gulp.src(src + '/*.jade')
	.pipe($.jade())
	.pipe(gulp.dest(root))
});


// JS
gulp.task('js', function() {
	gulp.src(src + '/assets/js/*.js')
	.pipe($.uglify())
	.pipe($.rename({
		extname: '.min.js'
	}))
	.pipe(gulp.dest(root + 'assets/js'));
});


// POSTCSS TO CSS
gulp.task('css', function(){
	gulp.src(src + '/assets/css/*.css')
	.pipe(postcss(processors))
	.pipe(cmq())
	.pipe(gulp.dest(root + 'assets/css'));
});


// IMAGES COMPRESSOR
gulp.task('img', function(){
	gulp.src(src + '/assets/img/*')
	.pipe($.imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest(root + '/assets/img'));
});


//ZIP
gulp.task('zip', function () {
	gulp.src(src + '/**/**/**/*')
	.pipe($.zip('build.zip'))
	.pipe($.versionTag(__dirname,'./package.json'))
	.pipe(gulp.dest('./'));
});


// DEFAULT TASK
gulp.task('default', ['devbuild', 'connect', 'watch']);


// BUILD TASK
gulp.task('build', function(callback) {
	runSequence('clean', ['jade', 'js', 'css', 'img'], 'zip', callback);
});

gulp.task('devbuild', function() {
	runSequence (['jade', 'js', 'css', 'img']);
});


// WATCH TASK
gulp.task('watch', function() {
	gulp.watch([src + '/*.jade',], ['jade'])
	gulp.watch([src + '/assets/js/**/**/**/*.js'], ['js'])
	gulp.watch([src + '/assets/css/**/**/**/*.css'], ['css'])
	gulp.watch([src + '/assets/img/**/**/**/*'], ['img'])
});
