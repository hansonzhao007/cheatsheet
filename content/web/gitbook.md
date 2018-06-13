# Install & initial a gitbook

## Install Gitbook
```bash
npm install -g gitbook-cli
git init gitbook-test
cd gitbook-test
gitbook init
```

## Install gulp and yarn
```bash
npm install -g gulp
npm install -g yarn
npm install --save gulp-htmlmin # used to compress html
yarn add gulp gulp-gh-pages gulp-load-plugins --dev # used to publish static page to github
yarn init # this will create package.json file
```

## Using plugin
create `book.json` file.
```json
{
    "root": "./", // web root directory
    "title": "cheatsheet",
    "author": "XS Zhao",
    "plugins": ["prism", "-highlight", "addcssjs", "anchor-navigation-ex" ], // the plugin you want to use
    "pluginsConfig": {
        "addcssjs": { "js": ["./custom/my.js"], "css": ["./custom/my.css"] } 
    }

}
```
in the ` plugins` fields, add the plugins your want. Then `gitbook install`

```bash
mac@macs-MacBook  ~/Project/test  gitbook install
info: installing 3 plugins using npm@3.9.2
info:
info: installing plugin "prism"
info: install plugin "prism" (*) from NPM with version 2.3.0
fetchMetadata → network   ▀ ╢███████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░╟
```


# Using gulp
Create a new file called `gulpfile.js`.

## [Compress html](https://github.com/jonschlinkert/gulp-htmlmin)
[reference](https://github.com/jonschlinkert/gulp-htmlmin)

Add following code in `gulpfile.js`:
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
[reference](https://gldraphael.com/blog/publishing-gitbook-to-github-pages/)

Add following code:
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
