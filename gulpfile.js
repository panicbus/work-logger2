'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/sass/*.scss', ['sass']);
});