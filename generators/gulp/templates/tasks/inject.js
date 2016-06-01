const gulp = require('gulp');
const inject = require('gulp-inject');

const path = require('../paths.json');

// 'gulp inject:head' -- injects our style.css file into the head of our HTML
gulp.task('inject:head', () =>
  gulp.src(path.inject.head.src)
    .pipe(inject(gulp.src(path.inject.head.styles, {read: false}), {ignorePath: '.tmp'}))
    .pipe(gulp.dest(path.inject.head.dest))
);

// 'gulp inject:footer' -- injects our index.js file into the end of our HTML
gulp.task('inject:footer', () =>
  gulp.src(path.inject.footer.src)
    .pipe(inject(gulp.src(path.inject.footer.scripts, {read: false}), {ignorePath: '.tmp'}))
    .pipe(gulp.dest(path.inject.footer.dest))
);
