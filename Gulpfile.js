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
    return gulp.src('assets/sass/*.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(gulp.dest('assets/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('assets/css'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    return gulp.src([ 'index.html' ])
        .pipe(connect.reload()); 
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('assets/sass/**/*.scss',['styles']);
    gulp.watch('index.html', ['html']);
});

gulp.task('default', ['styles', 'html', 'webserver', 'watch'], function() {

});