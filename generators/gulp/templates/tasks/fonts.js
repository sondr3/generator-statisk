const gulp = require('gulp');
const size = require('gulp-size');

const path = require('../paths.json');

// 'gulp fonts' -- copies your fonts to the temporary assets directory
gulp.task('fonts', () =>
  gulp.src(path.fonts.src)
    .pipe(gulp.dest(path.fonts.dest))
    .pipe(size({title: 'fonts'}))
);
