const gulp = require('gulp');

const path = require('../paths.json');
// 'gulp assets:copy' -- copies the assets into the dist directory, needs to be
// done this way because Jekyll overwrites the whole directory otherwise
gulp.task('copy:assets', () =>
  gulp.src(path.copy.assets.src)
    .pipe(gulp.dest(path.copy.assets.dest))
);

// 'gulp jekyll:copy' -- copies your processed Jekyll site to the dist directory
gulp.task('copy:site', () =>
  gulp.src(path.copy.site.src)
    .pipe(gulp.dest(path.copy.site.dest))
);

