'use strict';
var gulp = require('gulp');
var wiredep = require('wiredep').stream;

// Used for banners
var pkg = require('./package.json');

// Load plugins
var $ = require('gulp-load-plugins')();

// Banners
var banner =
      ['/**',
       ' * <%= pkg.name %> - <%= pkg.description %>',
       ' * @version v<%= pkg.version %>',
       ' * @link <%= pkg.homepage %>',
       ' * @license <%= pkg.license %>',
       ' */',
       ''].join('\n');

var bannerHTML =
      ['<!--',
       ' * <%= pkg.name %> - <%= pkg.description %>',
       ' * @version v<%= pkg.version %>',
       ' * @link <%= pkg.homepage %>',
       ' * @license <%= pkg.license %>',
       '-->',
       ''].join('\n');

var sizeOpts = {showFiles:true};

// Styles
gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.rubySass({
      style: 'expanded',
      loadPath: ['app/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size(sizeOpts));
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe($.size(sizeOpts));
});

// HTML
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size(sizeOpts));
});

// Images
gulp.task('images', function () {
 return gulp.src('app/images/**/*')
   .pipe($.cache($.imagemin({
   optimizationLevel: 3,
     progressive: true,
     interlaced: true
   })))
   .pipe(gulp.dest('dist/images'))
   .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images', 'dist/*.html'], {read: false}).pipe($.clean());
});

// Bundle
gulp.task('bundle', ['styles', 'scripts'], function() {
  var htmlCommentFilter = $.filter('**/*.html');
  var jsCommentFilter = $.filter(['**/*.js', '**/*.css']);

  return gulp.src('app/*.html')
    .pipe($.useref.assets())
    .pipe(jsCommentFilter)
    .pipe($.header(banner, {pkg:pkg}))
    .pipe(jsCommentFilter.restore())
    .pipe($.useref.restore())
    .pipe($.useref())
    .pipe(htmlCommentFilter)
    .pipe($.footer(bannerHTML, {pkg:pkg}))
    .pipe(htmlCommentFilter.restore())
    .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Connect
gulp.task('connect', [], function() {
  $.connect.server({
    root: ['app'],
    port: 9000,
    livereload: true
  });
});

// Inject Bower components
gulp.task('wiredep', function () {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      directory: 'app/bower_components',
      ignorePath: 'app/bower_components/'
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      ignorePath: 'app/'
    }))
    .pipe(gulp.dest('app'));
});

// Watch
gulp.task('watch', ['connect'], function () {
  // Watch for changes in `app` folder
  gulp.watch([
    'app/*.html',
    'app/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ], function(event) {
    return gulp.src(event.path)
      .pipe($.connect.reload());
  });

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);

  // Watch bower files
  gulp.watch('app/bower_components/*', ['wiredep']);
});
