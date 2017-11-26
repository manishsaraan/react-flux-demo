'use strict';
var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs local server
var open = require('gulp-open'); //open url in browser
var browserify = require('browserify'); //Bundle Js
var reactify = require('reactify'); // transform jsx to js
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat  = require('gulp-concat'); //concatinates files
var concat_css = require('gulp-concat-css'); //contact css
var lint = require('gulp-eslint'); //lint js files
var config = {
	port : 3000,
	devBaseUrl : 'http://localhost',
	paths : {
		html : './src/*.html',
		dist : './dist/',
		js   : './src/**/*.js',
		mainJs : './src/main.js',
		images : './src/images/*',
		css : [
               'node_modules/bootstrap/dist/css/bootstrap.min.css',
               'node_modules/bootstrap/dist/css/bootstrap.theme.min.css',
               './src/main.css'
		]
	}
}

//start local development server
gulp.task('connect', function() {
	 connect.server({
	 	root : ['dist'],
	 	port : config.port,
	 	base : config.devBaseUrl,
	 	liverelaod : true
	 })
});

gulp.task('open', ['connect'], function(){
	 gulp.src('./dist/index.html')
	     .pipe(open({
	     	 uri : config.devBaseUrl + ':' + config.port + "/"
	     }));
});

gulp.task('html', function(){
	gulp.src(config.paths.html)
	    .pipe(gulp.dest(config.paths.dist))
	    .pipe(connect.reload());
});

gulp.task('js', function(){
    browserify(config.paths.mainJs)
         .transform(reactify)
         .bundle()
         .on('error', console.error.bind(console))
         .pipe(source('bundle.js'))
         .pipe(gulp.dest(config.paths.dist+ "/scripts"))
         .pipe(connect.reload());
});  

gulp.task('images',function(){
	gulp.src(config.paths.images)
	    .pipe(gulp.dest(config.paths.dist + '/images'))
	    .pipe(connect.reload());

	    //publish favicon
	    gulp.src('./src/favicon.io')
	        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('css', function(){
     return  gulp.src(config.paths.css)
            .pipe(concat_css('/css/bundle.css'))
            .pipe(gulp.dest("dist/"))
});

gulp.task('lint', function(){
	return gulp.src(config.paths.js)
		.pipe(lint({
		  	  "root": true,
			  "ecmaFeatures": {
			    "jsx": true
			   },
		        rules: {
		            "quotes": 0,
				    "no-trailing-spaces": 0,
				    "eol-last": 0,
				    "no-unused-vars": 0,
				    "no-underscore-dangle": 0,
				    "no-alert": 0,
				    "no-lone-blocks": 0
		        },
		        globals: [
		            'jQuery',
		            '$'
		        ],
		        envs: [
		            'browser',
		            'node',
		            'jquery'
		        ]
        }))
		.pipe(lint.format());
});
gulp.task('watch', function(){
	gulp.watch(config.paths.html,['html']);
	gulp.watch(config.paths.js,['js', 'lint']);
})
gulp.task('default',['html', 'js', 'css', 'images', 'open', 'lint', 'watch']);