var gulp = require('gulp'),
	connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');
	
gulp.task('webserver', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('styles', function() {
	return gulp.src('src/styles/*.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('dist/styles'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/styles'))
		.pipe(connect.reload());
});

gulp.task('html', function() {
	return gulp.src([ 'index.html' ])
		.pipe(connect.reload()); 
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('src/styles/**/*.scss',['styles']);
	gulp.watch('index.html', ['html']);
});

gulp.task('default', ['styles', 'html', 'webserver', 'watch'], function() {

});