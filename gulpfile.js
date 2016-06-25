var config = require('./config');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var jsdoc = require('gulp-jsdoc3');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('minify-and-concat-js', () => {
  gulp.src(['client/js/module.js', 'client/js/**/*.js'])
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish', {beep : true}))
  .pipe(sourcemaps.init())
  .pipe(concat('app.min.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(sourcemaps.write())	
  .pipe(plumber.stop())
  .pipe(gulp.dest('client'));
});

gulp.task('concat-libs', () => {
  gulp.src(['client/libs/*.min.js', '!client/libs/angular.min.js'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('libs.min.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(plumber.stop())
  .pipe(gulp.dest('client'));
});

gulp.task('minify-css', () => {
	gulp.src('client/css/style.css')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(rename('style.min.css'))
  .pipe(plumber.stop())
  .pipe(gulp.dest('client/css'))
  .pipe(browserSync.stream());
});

gulp.task('generate-jsdoc', (cb) => {
  var jsdocConfig = require('./jsdoc.conf.json');
  gulp.src(['api/**/*.js', 'push/*.js', 'middleware/*.js', 'data/models/*.js'], {read: false})
  .pipe(jsdoc(jsdocConfig, cb));
});

gulp.task('watch', ['minify-and-concat-js', 'concat-libs', 'minify-css'], () => {
  if (config.environment === 'development') {
      browserSync.init({
        notify: false,
        proxy: {
          target: 'http://localhost:8081',
          ws: true,
          proxyReq: [
            function(proxyReq) {
              // required to override SPA routing returning HTML
              // proxyReq.setHeader('Accept', 'application/json');
            }
          ],
          proxyRes: [
            function(proxyRes, req, res) {
            }
          ]
        },
        ghostMode: {
          links: false
        }
      });
  }

  gulp.watch('client/js/**/*.js', ['minify-and-concat-js']).on('change', browserSync.reload);
  gulp.watch('client/libs/*.js', ['concat-libs']).on('change', browserSync.reload);
  gulp.watch('client/css/style.css', ['minify-css']);
  gulp.watch(['client/*.html', 'client/views/*.html', 'client/views/**/*.html']).on('change', browserSync.reload);
});