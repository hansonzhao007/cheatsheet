git add .
git commit -m "new"
git push origin master
gitbook build
gulp minify
gulp publish
