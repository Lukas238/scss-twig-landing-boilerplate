var gulp = require('gulp'),
  { src, dest, series, parallel } = require('gulp'),
  twig = require('gulp-twig'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  clean = require('gulp-rimraf'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  log = require('fancy-log'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber');

var cfg = {
  src: './src',
  dev: './dev',
  dist: './dist',
};
cfg.wf = cfg.dev;

var onError = function (error) {
  log.error(error.message);
  this.emit('end');
};

function set_wf_dev(done) {
  cfg.wf = cfg.dev;
  done();
}

function set_wf_dist(done) {
  cfg.wf = cfg.dist;
  done();
}

// CLEAN Working Folder
function clean_wf(done) {
  return src(cfg.wf + '/*', {
    read: false,
  }).pipe(clean());
}

function markup() {
  return gulp
    .src(cfg.src + '/markup/pages/**/*.twig')
    .pipe(
      twig({
        base: cfg.src + '/markup',
        functions: [
          {
            name: 'regexp_replace',
            func: function (str, regexp, replace) {
              var re = new RegExp(regexp, 'g');
              return str.replace(re, replace);
            },
          },
        ],
      })
    )
    .pipe(gulp.dest(cfg.wf));
}

function imgages() {
  return gulp.src(cfg.src + '/img/**/*.{jpg,gif,svg}').pipe(gulp.dest(cfg.wf + '/img/'));
}

function scss() {
  return gulp
    .src(cfg.src + '/scss/*.scss')
    .pipe(
      plumber({
        errorHandler: onError,
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: [
          './node_modules/bootstrap-sass/assets/stylesheets/'
      ],
        errLogToConsole: true,
      })
    )
    .pipe(
      cleanCSS({
        sourceMap: true,
        compatibility: 'ie11',
        format: 'beautify'
      })
    )
    .pipe(gulpif(cfg.wf == cfg.dev, sourcemaps.write('./')))
    .pipe(dest(cfg.wf + '/css'))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function js() {
  return src(cfg.src + '/js/*.js')
    .pipe(
      sourcemaps.init({
        loadMaps: true,
      })
    )
    .on('error', onError)
    .pipe(uglify({
      compress: false
    }))
    .pipe(gulpif(cfg.wf == cfg.dev, sourcemaps.write('./')))
    .pipe(dest(cfg.wf + '/js'))
    .pipe(
      reload({
        stream: true,
      })
    );
}

function serve(done) {
  browserSync.init(null, {
    notify: false,
    server: {
      baseDir: cfg.wf,
      directory: true,
    },
  });
  done();
}

function watch() {
  gulp.watch([cfg.src + '/markup/**/*.twig'], series(markup)).on('change', reload);
  gulp.watch([cfg.src + '/scss/**/*.scss'], series(scss)).on('change', reload);
  gulp.watch([cfg.src + '/js/**/*.js'], series(js)).on('change', reload);
}

// DEFAULT
exports.default = series(set_wf_dev, clean_wf, parallel(markup, scss, js, imgages), serve, watch);

exports.build = series(set_wf_dist, clean_wf, parallel(markup, scss, js, imgages));
