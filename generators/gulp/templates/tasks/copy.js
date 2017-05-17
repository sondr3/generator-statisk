'use strict';

import gulp from 'gulp';

// 'gulp assets:copy' -- copies the assets into the dist directory, needs to be
// done this way because Jekyll overwrites the whole directory otherwise
export function copyAssets() {
  return gulp.src('.tmp/assets/**/*').pipe(gulp.dest('dist/assets'));
}

// 'gulp jekyll:copy' -- copies your processed Jekyll site to the dist directory
export function copySite() {
  return gulp.src('.tmp/dist/**/*').pipe(gulp.dest('dist'));
}
