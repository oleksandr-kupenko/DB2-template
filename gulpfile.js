const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const njk = require('gulp-nunjucks');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function style() {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      })
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function nunjucks() {
  gulp.src('./src/pages/index.html').pipe(njk.compile()).pipe(gulp.dest('dist')).pipe(browserSync.stream());
  gulp.src('./src/pages/*.html').pipe(njk.compile()).pipe(gulp.dest('dist/pages')).pipe(browserSync.stream());
}

async function build() {
  await style();
  await nunjucks();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'pages/index.html',
    },
  });
  gulp.watch('./src/scss/**/.scss', style);
  gulp.watch('./src/partials/*.html', nunjucks);
}

exports.style = style;
exports.build = build;
exports.watch = watch;
exports.nunjucks = nunjucks;
exports.default = build;
