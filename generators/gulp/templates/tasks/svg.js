'use strict';

import gulp from 'gulp';
import svgmin from 'gulp-svgmin';

export function svg() {
  return gulp
    .src('src/**/*.svg')
    .pipe(svgmin())
    .pipe(size({ title: 'SVG' }))
    .pipe(gulp.dest('.tmp'));
}
