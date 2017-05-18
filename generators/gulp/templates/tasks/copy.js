'use strict';

import gulp from 'gulp';

import { src, dest } from './config';

// 'gulp assets:copy' -- copies the assets into the dist directory, needs to be
// done this way because Jekyll overwrites the whole directory otherwise
export function copyAssets() {
  return gulp.src(`${src.assets}/**/*`).pipe(gulp.dest(dest.assets));
}

// 'gulp jekyll:copy' -- copies your processed Jekyll site to the dist directory
export function copySite() {
  return gulp.src(`${src.site}/**/*`).pipe(gulp.dest(dest.site));
}
