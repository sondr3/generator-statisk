'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import cache from 'gulp-cache';
import size from 'gulp-size';

import { src, dest } from './config';

// 'gulp images' -- optimizes and caches your images
export function images() {
  return gulp
    .src(`${src.images}/**/*`)
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng()
        ])
      )
    )
    .pipe(gulp.dest(dest.images))
    .pipe(size({ title: 'images' }));
}
