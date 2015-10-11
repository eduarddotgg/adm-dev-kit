// GULP PLUGINS
var gulp             = require('gulp');
var $                = require('gulp-load-plugins')();
var changed          = require('gulp-changed');
var watch            = require('gulp-watch');
var gif              = require('gulp-if');
var resources        = require('gulp-resources');
var concat           = require('gulp-concat');
var replace          = require('gulp-replace');
var foreach          = require('gulp-foreach');
var rename           = require('gulp-rename');
var pngquant         = require('imagemin-pngquant');
var uglify           = require('gulp-uglify');


var path             = require('path');
var del              = require('del');
var runSequence      = require('run-sequence');
var args             = require('yargs').argv;


// SRC AND DEST
var src = 'src';
var root = 'dist/';


// POSTCSS PLUGINS
var postcss          = require('gulp-postcss');
var postcssImport    = require('postcss-import');
var nested           = require('postcss-nested');
var map              = require('postcss-map');
var minmax           = require('postcss-media-minmax');
var mscale           = require('postcss-modular-scale');
var grid             = require('postcss-simple-grid');
var pxtorem          = require('postcss-pxtorem');
var customProperties = require('postcss-custom-properties');
var autoprefixer     = require('autoprefixer');
var cssnano          = require('cssnano');
var query            = require("css-mqpacker")()


var cssMaps = {
	basePath: (src),
	maps: [ 'variables.yml' ]
}

var processors = [
	postcssImport,
	nested,
	map(cssMaps),
	minmax,
	mscale,
	grid,
	cssnano
];

var postprocess = [
	autoprefixer,
	customProperties,
	pxtorem,
	query
];


var isProduction  = args.env === 'production';


// CLEAN
gulp.task('clean', function (cb) {
	del([root + '*'], cb);
});

// SIMPLE HTML SERVER
gulp.task('connect', function(){
	$.connect.server({
		root: root,
		port: 8888,
		livereload: true
	});
});


// EXTRACT COMPONENTS
gulp.task('components', function () {
	gulp.src(src + '/*.jade')
	// .pipe(changed('./tmp'))
	.pipe(foreach(function(stream, file){
		
		var name = path.basename(file.path);
		
		var cssName = name.replace(/\.[^.]*$/i, '.css')
		var cssPath = 'assets/css/'
		var cssLink = '<link rel="stylesheet" type="text/css" href="'+ cssPath + cssName +'"/>'
		
		var jsName = name.replace(/\.[^.]*$/i, '.min.js')
		var jsPath = 'assets/js/'
		var jsLink = '<script src="'+ jsPath + jsName +'"></script>'
		
		return stream
		.pipe($.jade())
		.pipe(resources())
		
		// JS
		.pipe(gif('**/*.js', concat('assets/js/' + jsName)))
		.pipe(gif('assets/js/*.js', uglify()))
		
		// CSS
		.pipe(gif('**/*.css', postcss(processors)))
		.pipe(gif('**/*.css', concat('assets/css/' + cssName)))
		.pipe(gif('assets/css/**/*.css', postcss(postprocess)))
		
		// REPLACE
		.pipe(replace(/<link href[^>]+?[ ]*>/g, ''))
		.pipe(replace('img/', 'assets/img/'))
		.pipe(replace('<css></css>', cssLink))
		.pipe(replace('<js></js>', jsLink))
	}))
    .pipe(gulp.dest(root));
});



// IMAGES COMPRESSOR
gulp.task('img', function(){
	gulp.src([src + '/**/*.jpg', src + '/**/*.jpeg', src + '/**/*.png', src + '/**/*.svg', src + '/**/*.gif'])
	.pipe(rename({dirname: ''}))
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
	runSequence('clean', ['components', 'img'], 'zip', callback);
});

gulp.task('devbuild', function() {
	runSequence (['components', 'img']);
});


// WATCH TASK
gulp.task('watch', function() {
	gulp.watch([src + '/**/**/**/*.*'], ['components'])
	gulp.watch([src + '/**/*.jpg', src + '/**/*.jpeg', src + '/**/*.png', src + '/**/*.svg', src + '/**/*.gif'], ['img'])
});
