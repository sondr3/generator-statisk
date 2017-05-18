'use strict';

import gulp from 'gulp';
import svgmin from 'gulp-svgmin';

import { src, dest } from './config';

export function svg() {
  return gulp
    .src(`${src.svg}/**/*.svg`)
    .pipe(svgmin())
    .pipe(size({ title: 'SVG' }))
    .pipe(gulp.dest(dest.svg));
}
