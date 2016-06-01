const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const size = require('gulp-size');

const path = require('../paths.json');

// 'gulp images' -- optimizes and caches your images
gulp.task('images', () =>
  gulp.src(path.images.src)
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng(),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ])))
    .pipe(gulp.dest(path.images.dest))
    .pipe(size({title: 'images'}))
);
