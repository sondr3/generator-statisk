import gulp from 'gulp';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { config as webpackConfig } from './scripts';
import { styles } from './styles';
import { scripts } from './scripts';
import { images } from './images';
import { svg } from './svg';
import { siteTmp, site, injectHead, injectFooter } from './site';
import { copySite } from './copy';

import { server as config, src } from './config';

const bundler = webpack(webpackConfig);

const inject = gulp.series(injectHead, injectFooter);
const buildSite = gulp.series(siteTmp, inject, site, copySite);

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
    server: config.server,
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
  gulp.watch(config.files, gulp.series(buildSite, reload));

  gulp.watch(config.extra, gulp.series(site, reload));
  gulp.watch(`${config.js}/**/*.js`, gulp.series(scripts, reload));
  gulp.watch(`${src.scss}/**/*.scss`, gulp.series(styles));
  gulp.watch(`${src.images}/**/*`, gulp.series(images, reload));
}
