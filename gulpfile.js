'user strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');

var jsDEST = 'assets/js/';
var cssDEST = 'assets/css/'

gulp.task('js', function() {
    //concat and minify js
    return gulp.src(['assets/js/binomial.js',
                     'assets/js/jquery.js',
                     'assets/js/jquery-ui.min.js',
                     'assets/js/uikit.min.js',
                     'assets/js/components/accordion.min.js',
                     'assets/js/moment.min.js',
                     'assets/js/Chart.js',
                     'assets/js/nouislider.min.js',
                     'assets/js/app.js'])
        .pipe(concat('dieStats.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDEST))
        .pipe(notify({ message: 'Finished compressing javascript' }));
});

gulp.task('css', function() {
    //concat and minify css
    return gulp.src(['assets/css/font-awesome.min.css',
                     'assets/css/normalize.css',
                     'assets/css/uikit.gradient.min.css',
                     'assets/css/jquery-ui.min.css',
                     'assets/css/nouislider.min.css',
                     'assets/css/custom.css'])
        .pipe(concat('dieStats.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(cssDEST))
        .pipe(notify( { message: 'Finished compressing css' }))
});
