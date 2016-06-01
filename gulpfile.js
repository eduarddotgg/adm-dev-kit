var gulp			 = require('gulp');
var $	 			 = require('gulp-load-plugins')();
var watch			 = require('gulp-watch');
var path			 = require('path');
var runSequence		 = require('run-sequence');
var args			 = require('yargs').argv;
var pngquant		 = require('imagemin-pngquant');
var inlineImagePath  = require('gulp-inline-image-path');
var htmlreplace		 = require('gulp-html-replace');


// ENV
var isDevelopment	 = args.env === 'development';
var isProduction	 = args.env === 'production';

//
var src				 = 'src';
var dest			 = 'dest';

// ASSETS FOLDERS
var assetsFolder	 = 'assets/';
var jsFolder		 = assetsFolder + 'js/';
var cssFolder		 = assetsFolder + 'css/';
var imgFolder		 = '/' + assetsFolder + 'img/';
var fontsFolder		 = '/' + assetsFolder + 'fonts/';


// POSTHTML PLUGINS
var posthtmlBem		 = require('posthtml-bem');

// POSTCSS PLUGINS
var postcssImport	 = require('postcss-import');
var nested			 = require('postcss-nested');
var cssvariables	 = require('postcss-css-variables');
var minmax			 = require('postcss-media-minmax');
var mscale			 = require('postcss-modular-scale');
var grid			 = require('postcss-simple-grid');
var pxtorem			 = require('postcss-pxtorem');
var customMedia      = require("postcss-custom-media");
var customProperties = require('postcss-custom-properties');
var font			 = require('postcss-font-magician');
var autoprefixer	 = require('autoprefixer');
var query			 = require('css-mqpacker');
var rebaser			 = require("postcss-assets-rebase");
var csso 			 = require('postcss-csso');
var cssInject		 = require("postcss-inject");
var stylelint		 = require("stylelint");
var reporter		 = require("postcss-reporter");


// POSTCSS PLUGINS SETTINGS
var processors = [
	postcssImport
	, cssInject({
		injectTo: '',
		cssFilePath: 'src/_css-variables.css'
	})
	, minmax
	, customMedia
	, nested
	, mscale
	, cssvariables
	, grid({separator: '--'})
	, rebaser({
		assetsPath: "../img",
		relative: true
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
	, csso
];

// COMPONENTS
gulp.task('components', function(){
	return gulp.src(src + '/*.pug')
		.pipe($.flatmap(function(stream, file){

			// BASE FILE NAME
			var name = path.basename(file.path);

			// CSS
			var cssFileName = name.replace(/\.[^.]*$/i, '.css');
			var cssFilePath = 'assets/css/';

			// JS
			var jsFileName = name.replace(/\.[^.]*$/i, '.min.js');
			var jsFilePath = 'assets/js/';

			// RETURN STREAM
			return stream

			// JADE 2 HTML
			.pipe($.pug())
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
			.pipe($.if('**/*.css', $.postcss(processors,{
				to: "./dest/assets/css/*.css"
			})))
			.pipe($.if('**/*.css', $.concat(cssFolder + cssFileName)))
			.pipe($.if('assets/css/**/*.css', $.postcss(postprocess)))

			// REPLACE JS AND CSS TAGS
			.pipe($.replace(/<link href[^>]+?[ ]*>/g, ''))
			.pipe($.replace(/<script src[^>]+?[ ]*><\/[^>]+?[ ]*>/g, ''))
			.pipe(htmlreplace({
				'css': cssFilePath + cssFileName,
				'js': jsFilePath + jsFileName
			}))

			//	INLINE IMAGES
			.pipe(inlineImagePath({path:"assets/img"}))
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


// FAVICON
gulp.task('favicon', function(){
	return gulp.src(src + '/favicon.ico')
		.pipe(gulp.dest(dest));
});


// FONTS
gulp.task('fonts', function(){
	return gulp.src([src + '/**/*.woff', src + '/**/*.ttf'])
		.pipe($.rename({dirname: ''}))
		.pipe(gulp.dest(dest + fontsFolder));
});


// LINT JS
gulp.task('lintJS', function(){
	return gulp.src([src + '/**/*.js', '!' + src + '/jspm_packages/**/*.js', '!' + src + '/config.js'])
		.pipe($.eslint({
			configFile: './.eslintrc'
		}))

		.pipe($.eslint.result(function (result) {
			// Called for each ESLint result.
			console.log('ESLint result: ' + result.filePath);
			console.log('# Messages: ' + result.messages.length);
			console.log('# Warnings: ' + result.warningCount);
			console.log('# Errors: ' + result.errorCount);
		}))
		.pipe($.eslint.format())
		.pipe($.eslint.failOnError());
});

// LINT CSS
gulp.task('lintCSS', function(){
	return gulp.src([src + '/**/*.css'])
		.pipe($.postcss([
			stylelint({
				configFile: './.stylelintrc'
			})
			, reporter({
				clearMessages: true,
				throwError: true
			})
		]))
});


// GULP DEFAULT TASK
gulp.task('default', function(callback){
	runSequence('components', ['img', 'favicon', 'fonts'], callback)
});


// GULP LINT TASKS
gulp.task('lint', function(callback){
	runSequence('lintJS', 'lintCSS', callback)
});