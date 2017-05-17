'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import postCSS from 'gulp-postcss';
import cleanCSS from 'gulp-clean-css';
import gzip from 'gulp-gzip';
import rename from 'gulp-rename';
import rev from 'gulp-rev';
import sass from 'gulp-sass';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';

const production = process.env.NODE_ENV === 'production';

// 'gulp styles' -- creates a CSS file from your SASS, adds prefixes and
// creates a sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SASS, adds prefixes and
// then minifies, gzips and cache busts it. Does not create a sourcemap
export function styles() {
  return gulp
    .src('src/assets/scss/style.scss')
    .pipe(gulpif(!production, sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: 'expanded',
        precision: 10,
        sourceMap: true,
        errLogToConsole: true
      })
    )
    .pipe(postCSS([autoprefixer({ browsers: ['last 1 version'] })]))
    .pipe(
      size({
        showFiles: true
      })
    )
    .pipe(gulpif(production, rename({ suffix: '.min' })))
    .pipe(gulpif(production, gulpif('*.css', cleanCSS({ level: 2 }))))
    .pipe(
      gulpif(
        production,
        size({
          showFiles: true
        })
      )
    )
    .pipe(gulpif(production, rev()))
    .pipe(gulpif(!production, sourcemaps.write('.')))
    .pipe(gulpif(production, gulp.dest('.tmp/assets/stylesheets')))
    .pipe(gulpif(production, gulpif('*.css', gzip({ append: true }))))
    .pipe(
      gulpif(
        production,
        size({
          gzip: true,
          showFiles: true
        })
      )
    )
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    .pipe(browserSync.stream({ match: '**/*.css' }));
}
