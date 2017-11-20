// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps');
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    lr = require('tiny-lr'),
    server = lr();


var styles = [
  'src/scss/normalize.scss',
  'src/scss/main.scss',
]

var scripts = [
  'src/js/vendor/modernizr-3.5.0.min.js',
  'src/js/vendor/jquery-3.2.1.min.js',
  'src/js/vendor/ScrollMagic.min.js',
  'src/js/vendor/debug.addIndicators.min.js',
  'src/js/vendor/animation.gsap.min.js',
  'src/js/vendor/headroom.min.js',
  'src/js/plugins.js',
  'src/js/animations.js',
  'src/js/main.js',
]

// Styles
gulp.task('styles', function() {
  return sass(styles, { style: 'expanded', sourcemap: true })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('app.css'))
    .pipe(rename({ suffix: '.min' }))
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(scripts)
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/img'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean', 'connect', 'watch'], function() {
    gulp.run('styles', 'scripts', 'images');
});

gulp.task('connect', function () {
  connect.server({
    root: './',
    livereload: true
  });
});

// Watch
gulp.task('watch', function() {

  console.log('watching');
    // Watch .scss files
    gulp.watch('src/scss/**/*.scss', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.run('styles');
    });

    // Watch .js files
    gulp.watch('src/js/**/*.js', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.run('scripts');
    });

    // Watch image files
    gulp.watch('src/img/**/*', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      gulp.run('images');
    });

    // Watch image files
    gulp.watch('./**/*.html', function (event) {
      gulp.run('html');
    });
});
