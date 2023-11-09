const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify-es').default;

function minifyCSS() {
  return gulp.src('style.css')
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
}

function minifyHTML() {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}

function minifyJS() {
  return gulp.src('app.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
}

function optimizeImages() {
  return gulp.src('images/*.png') // Specific to PNG files
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 5 }) // Configure OptiPNG for PNG optimization
    ]))
    .pipe(gulp.dest('dist/images'));
}

function watch() {
  gulp.watch('style.css', minifyCSS);
  gulp.watch('index.html', minifyHTML);
  gulp.watch('app.js', minifyJS);
  gulp.watch('images/*', optimizeImages);
}

exports.default = gulp.series(minifyCSS, minifyHTML, minifyJS, optimizeImages, watch);
