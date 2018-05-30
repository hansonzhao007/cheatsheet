const gulp = require('gulp');

const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

// Publishes the site to GitHub Pages
gulp.task('publish', () => {
  console.log('Publishing to GH Pages');
  return gulp.src('./public/**/*')
    .pipe($.ghPages({
      origin: 'origin',
      branch: 'gh-pages'
    }));
});