## [Compress html](https://github.com/jonschlinkert/gulp-htmlmin)
Create a new file called `gulpfile.js` and add the following code to it:
```js
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

// Compress the html
gulp.task('minify', function() {
    return gulp.src('./_book/**/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./_book/'));
});
```

usage:
```bash
gulp minify
```

## [Publish static website to github pages](https://gldraphael.com/blog/publishing-gitbook-to-github-pages/)
create a `package.json` file using cmd `yarn init`.

If you don't have `yarn` installed you may install it using `npm install -g yarn`.

After that, run the following command to install required dependencies:
```bash
yarn add gulp gulp-gh-pages gulp-load-plugins --dev
```

If you don't have `gulp` installed globally run `npm install -g gulp` as well.

Create a new file called `gulpfile.js` and add the following code to it:
```js
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

// Publishes the site to GitHub Pages
gulp.task('publish', () => {
  console.log('Publishing to GH Pages');
  return gulp.src('./_book/**/*')
    .pipe($.ghPages({
      origin: 'origin',
      branch: 'gh-pages'
    }));
});
```

usage:
```bash
gulp publish
```
