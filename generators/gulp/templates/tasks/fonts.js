'use strict';

import gulp from 'gulp';
import size from 'gulp-size';

// 'gulp fonts' -- copies your fonts to the temporary assets directory
export function fonts() {
  return gulp
    .src('src/assets/fonts/**/*')
    .pipe(gulp.dest('.tmp/assets/fonts'))
    .pipe(size({ title: 'fonts' }));
}
