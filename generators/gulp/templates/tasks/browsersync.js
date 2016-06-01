const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const path = require('../paths.json');

// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open up your website in your browser and watch for changes
// in all your files and update them when needed
gulp.task('serve', (done) => {
  browserSync.init({
    // tunnel: true,
    // open: false,
    server: path.browsersync.server
  });
  done();

  // Watch various files for changes and do the needful
  gulp.watch(path.browsersync.watch.jekyll, gulp.series('build:jekyll', reload));
  gulp.watch(path.browsersync.watch.text, gulp.series('jekyll', reload));
  gulp.watch(path.browsersync.watch.scripts, gulp.series('scripts', reload));
  gulp.watch(path.browsersync.watch.styles, gulp.series('styles', reload));
  gulp.watch(path.browsersync.watch.images, gulp.series('images', reload));
});
