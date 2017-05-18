'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import gzip from 'gulp-size';
import htmlmin from 'gulp-htmlmin';

import { src, dest } from './config';

const production = process.env.NODE_ENV === 'production';

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips our HTML files
export function minifyHTML() {
  return gulp
    .src(`${src.html}/**/*.html`)
    .pipe(
      gulpif(
        production,
        htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        })
      )
    )
    .pipe(gulpif(production, size({ title: 'optimized HTML' })))
    .pipe(gulpif(production, gulp.dest(dest.html)))
    .pipe(gulpif(production, gzip({ append: true })))
    .pipe(
      gulpif(
        production,
        size({
          title: 'gzipped HTML',
          gzip: true
        })
      )
    )
    .pipe(gulpif(production, gulp.dest(dest.html)));
}
