import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { config as webpackConfig } from './scripts';
import { styles } from './styles';
import { scripts } from './scripts';

const bundler = webpack(webpackConfig);

// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}

// 'gulp serve' -- open up your website in your browser and watch for changes
// in all your files and update them $.if needed
export function serve() {
  browserSync.init({
    // tunnel: true,
    // open: false,
    server: ['.tmp', 'dist'],
    middleware: [
      webpackDevMiddleware(bundler, {
        stats: 'errors-only'
      }),
      webpackHotMiddleware(bundler, {
        stats: 'errors-only'
      })
    ]
  });

  // Watch various files for changes and do the needful
  // gulp.watch(
  //   ['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'],
  //   gulp.series('build:site', reload)
  // );

  // gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('site', reload));
  gulp.watch('src/assets/javascript/**/*.js', gulp.series(scripts, reload));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series(styles));
  // gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
}
