var gulp			 = require('gulp');
var $	 			 = require('gulp-load-plugins')();
var watch			 = require('gulp-watch');
var path			 = require('path');
var runSequence	     = require('run-sequence');
var args			 = require('yargs').argv;
var pngquant		 = require('imagemin-pngquant');
var inlineImagePath  = require('gulp-inline-image-path');


// ENV
var isDevelopment	 = args.env === 'development';
var isProduction	 = args.env === 'production';

//
var src				 = 'webroot';
var dest			 = 'dest';

// ASSETS FOLDERS
var assetsFolder	 = 'assets/';
var jsFolder		 = assetsFolder + 'js/';
var cssFolder		 = assetsFolder + 'css/';
var imgFolder		 = '/' + assetsFolder + 'img/';


// POSTHTML PLUGINS
var posthtmlBem	     = require('posthtml-bem');

// POSTCSS PLUGINS
var postcssImport	 = require('postcss-import');
var nested		     = require('postcss-nested');
var cssvariables	 = require('postcss-css-variables');
var vars			 = require('postcss-simple-vars');
var minmax		     = require('postcss-media-minmax');
var mscale		     = require('postcss-modular-scale');
var grid			 = require('postcss-simple-grid');
var pxtorem		     = require('postcss-pxtorem');
var customProperties = require('postcss-custom-properties');
var font			 = require('postcss-font-magician');
var autoprefixer	 = require('autoprefixer');
var cssnano		     = require('cssnano');
var query			 = require('css-mqpacker');


// COMPONENTS
gulp.task('components', function(){
	// POSTCSS PLUGINS SETTINGS
	var processors = [
		postcssImport
		, vars({
			variables: function(){
				delete require.cache[require.resolve('./' + src + '/variables.js')];
				return require('./' + src + '/variables.js');
			},
			silent: true,
			unknown: function (node, name, result) {
				node.warn(result, 'Unknown variable ' + name);
			}
		})
		, minmax
		, nested
		, mscale
		, cssvariables
		, grid({separator: '--'})
		,url({
			url: "rebase" // or "inline" or "copy"
		})
		, font
	];

	var postprocess = [
		autoprefixer
		, customProperties
		, pxtorem({
			propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'padding'],
			mediaQuery: true
		})
		, query({sort: true})
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
			.pipe($.replace('webroot/', ''))

			// 		// EXTRACT JS AND CSS

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
			.pipe(inlineImagePath({path:"assets/img"}))
			// .pipe($.replace('/(<img.*?src=")([^"]*?(\/[^\/]*\.[^"]+))/g', ''))
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


// // GULP WATCH TASK
// gulp.task('watch', function(){
// 	gulp.watch([src + '/**/**/**/*.*'], ['components'])
// 	gulp.watch([src + '/**/*.jpg', src + '/**/*.jpeg', src + '/**/*.png', src + '/**/*.svg', src + '/**/*.gif'], ['img'])
// });


// GULP DEFAULT TASK
gulp.task('default', function(callback){
	runSequence('components', ['watch'], 'server', callback)
});