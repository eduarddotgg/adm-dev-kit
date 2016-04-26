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
var vars			 = require('postcss-simple-vars');
var minmax			 = require('postcss-media-minmax');
var mscale			 = require('postcss-modular-scale');
var grid			 = require('postcss-simple-grid');
var pxtorem			 = require('postcss-pxtorem');
var customProperties = require('postcss-custom-properties');
var font			 = require('postcss-font-magician');
var autoprefixer	 = require('autoprefixer');
var cssnano			 = require('cssnano');
var query			 = require('css-mqpacker');
var rebaser			 = require("postcss-assets-rebase");
var csso 			 = require('postcss-csso');


// COMPONENTS
gulp.task('components', function(){
	// POSTCSS PLUGINS SETTINGS
	var processors = [
		postcssImport
		, vars({
			variables: function(){
				delete require.cache[require.resolve('./' + src + '/_cssVariables.js')];
				return require('./' + src + '/_cssVariables.js');
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
		// , cssnano
	];

	return gulp.src(src + '/*.jade')
		.pipe($.foreach(function(stream, file){

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


// GULP DEFAULT TASK
gulp.task('default', function(callback){
	runSequence('components', ['img', 'favicon', 'fonts'], callback)
});
