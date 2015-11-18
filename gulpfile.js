var gulp		     = require('gulp');
var $	 		     = require('gulp-load-plugins')();
var server           = require('gulp-develop-server');
var watch		     = require('gulp-watch');
var path		     = require('path');
var runSequence      = require('run-sequence');
var args		     = require('yargs').argv;
var pngquant	     = require('imagemin-pngquant');


// 
var isDevelopment    = args.env === 'development';
var isProduction     = args.env === 'production';

// 
var src		         = 'webroot';
var dest		     = 'dest';

// ASSETS FOLDERS
var assetsFolder     = 'assets/';
var jsFolder	     = assetsFolder + 'js/';
var cssFolder	     = assetsFolder + 'css/';
var imgFolder	     = '/' + assetsFolder + 'img/';


// POSTHTML PLUGINS
var posthtmlBem      = require('posthtml-bem');

// POSTCSS PLUGINS
var postcssImport    = require('postcss-import');
var nested           = require('postcss-nested');
var postcssBem       = require('postcss-bem');
var map              = require('postcss-map');
var minmax           = require('postcss-media-minmax');
var mscale           = require('postcss-modular-scale');
var grid             = require('postcss-simple-grid');
var pxtorem          = require('postcss-pxtorem');
var customProperties = require('postcss-custom-properties');
var font             = require('postcss-font-magician');
var autoprefixer     = require('autoprefixer');
var cssnano          = require('cssnano');
var query            = require("css-mqpacker")();


// SERVER
gulp.task('server', function() {
    server.listen({path: './server.js'});
});


// COMPONENTS
gulp.task('components', function(){
	// POSTCSS PLUGINS SETTINGS
	var cssMaps = {
		basePath: (src),
		maps: ['variables.yml']
	};
	
	var processors = [
		postcssImport
		, nested
		, map(cssMaps)
		, minmax
		, mscale
		, grid
		// , font
	];
	
	var postprocess = [
		autoprefixer
		, customProperties
		, pxtorem
		, query
		, cssnano
	];
	
	return gulp.src(src + '/*.jade')
		.pipe($.foreach(function(stream, file){
			
			// BASE FILE NAME
			var name = path.basename(file.path);
			
			// CSS
			var cssFileName = name.replace(/\.[^.]*$/i, '.css');
			var cssFilePath = 'assets/css/';
			var cssFileLink = '<link rel="stylesheet" type="text/css" href="'+ cssFilePath + cssFileName +'"/>';
			
			// JS
			var jsFileName = name.replace(/\.[^.]*$/i, '.min.js');
			var jsFilePath = 'assets/js/';
			var jsFileLink = '<script src="'+ jsFilePath + jsFileName +'"></script>';
			
			// RETURN STREAM
			return stream
			
			// JADE 2 HTML
			.pipe($.jade())
			.pipe($.posthtml([
				posthtmlBem({
					elemPrefix: '__',
					modPrefix: '_',
					modDlmtr: '--'
				})
			]))
			
			// EXTRACT JS AND CSS
			.pipe($.resources())
			
			// JS
			.pipe($.if('**/*.js', $.concat(jsFolder + jsFileName)))
			.pipe($.if(jsFolder + '*.js', $.uglify()))
			
			// CSS
			.pipe($.if('**/*.css', $.postcss(processors)))
			.pipe($.if('**/*.css', $.concat(cssFolder + cssFileName)))
			.pipe($.if('assets/css/**/*.css', $.postcss(postprocess)))
			
			.pipe($.replace(/<link href[^>]+?[ ]*>/g, ''))
			.pipe($.replace(/<script src[^>]+?[ ]*><\/[^>]+?[ ]*>/g, ''))
			.pipe($.replace('img/', 'assets/img/'))
			.pipe($.replace('<css></css>', cssFileLink))
			.pipe($.replace('<js></js>', jsFileLink))
		}))
		.pipe(gulp.dest(dest));
});


// IMAGES
gulp.task('img', function(){
	return gulp.src([src + '/**/*.jpg', src + '/**/*.jpeg', src + '/**/*.png', src + '/**/*.svg', src + '/**/*.gif'])
		.pipe($.if(isProduction, 
			$.imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [pngquant()]
			})
		))
		.pipe($.rename({dirname: ''}))
		.pipe(gulp.dest(dest + imgFolder));
});


// GULP WATCH TASK
gulp.task('watch', function(){
	gulp.watch([src + '/**/**/**/*.*'], ['components'])
	gulp.watch([src + '/**/*.jpg', src + '/**/*.jpeg', src + '/**/*.png', src + '/**/*.svg', src + '/**/*.gif'], ['img'])
});


// GULP DEFAULT TASK
gulp.task('default', function(callback){
	runSequence('components', ['watch'], 'server', callback)
});
