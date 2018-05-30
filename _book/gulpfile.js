const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

// Compress the html
gulp.task('minify', function() {
    return gulp.src('./_book/**/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./_book/'));
  });

// Publishes the site to GitHub Pages
gulp.task('publish', () => {
  console.log('Publishing to GH Pages');
  return gulp.src('./_book/**/*')
    .pipe($.ghPages({
      origin: 'origin',
      branch: 'gh-pages'
    }));
});