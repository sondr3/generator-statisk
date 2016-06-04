const gulp = require('gulp');
const del = require('del');

const path = require('../paths.json');

gulp.task('clean:assets', () => {
  return del(path.clean.assets);
});
gulp.task('clean:images', () => {
  return del(path.clean.images);
});
gulp.task('clean:dist', () => {
  return del(path.clean.dist);
});
gulp.task('clean:gzip', () => {
  return del(path.clean.gzip);
});
gulp.task('clean:site', () => {
  return del(path.clean.site);
});
