'user strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

var DEST = 'assets/js/';

gulp.task('default', function() {
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
        .pipe(gulp.dest(DEST))
        .pipe(notify({ message: 'Finished concat and uglifying'}));
});
