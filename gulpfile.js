'use strict';
var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs local server
var open = require('gulp-open'); //open url in browser
var browserify = require('browserify'); //Bundle Js
var reactify = require('reactify'); // transform jsx to js
var source = require('vinyl-source-stream'); //use conventional text streams with gulp


var config = {
	port : 3000,
	devBaseUrl : 'http://localhost',
	paths : {
		html : './src/*.html',
		dist : './dist/',
		js   : './src/**/*.js',
		mainJs : './src/main.js'
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
         .pipe(gulp.dest(config.paths.dist+"/scripts"))
         .pipe(connect.reload());
});  

gulp.task('watch', function(){
	gulp.watch(config.paths.html,['html']);
	gulp.watch(config.paths.js,['js']);
})
gulp.task('default',['html', 'js', 'open', 'watch']);