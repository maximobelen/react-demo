'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    reactify = require ('reactify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    open = require('gulp-open'),
    autoprefixer = require('gulp-autoprefixer');

var serverPort = 8000;

// Dev task
gulp.task('dev', ['clean', 'copy', 'views', 'styles', 'lint', 'browserify'], function() { });

// Clean task
gulp.task('clean', function() {
  gulp.src('./dist/views', { read: false }) // much faster
  .pipe(rimraf({force: true}));
});

// Open browser
gulp.task('open', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:'+serverPort}));
});

gulp.task('connect', function () {
  connect.server({
    root: './dist',
    port: serverPort,
    host: '0.0.0.0',
    livereload: true
  });
});

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/main.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('dist/css/'))
  .pipe(connect.reload());
});

// Copy assets task
gulp.task('copy', function() {
  var g = gulp.src('app/assets/**/*.*');
  return g.pipe(gulp.dest('dist/assets/'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/scripts/index.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false,
    transform: [reactify]
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload());
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'))
  .pipe(connect.reload());

  // Any other view files from app/views
  gulp.src('app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'));
});

gulp.task('watch', ['lint'], function() {

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);
  // Watch our sass files
  gulp.watch(['app/styles/**/*.scss', 'app/scripts/**/*.scss'],[
    'styles'
  ]);

  gulp.watch(['app/**/*.html'], [
    'views'
  ]);
  
});

gulp.task('default', ['dev', 'watch', 'connect', 'open']);