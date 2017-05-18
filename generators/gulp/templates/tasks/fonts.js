'use strict';

import gulp from 'gulp';
import size from 'gulp-size';

import { src, dest } from './config';

// 'gulp fonts' -- copies your fonts to the temporary assets directory
export function fonts() {
  return gulp
    .src(`${src.fonts}/**/*`)
    .pipe(gulp.dest(dest.fonts))
    .pipe(size({ title: 'fonts' }));
}
