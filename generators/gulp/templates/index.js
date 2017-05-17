// generated on <%= date %> using <%= name %> <%= version %>
'use strict';

import gulp from 'gulp';

import { serve } from './browsersync';
import { styles } from './styles';
import { scripts } from './scripts';
import { minifyHTML } from './html';
import { images } from './images';
import {
  cleanAssets,
  cleanImages,
  cleanDist,
  cleanGzip,
  cleanSite
} from './clean';
import { copyAssets, copySite } from './copy';
import { fonts } from './fonts';
import { svg } from './svg';
import { siteTmp, site, injectHead, injectFooter } from './site';

export const inject = gulp.series(injectHead, injectFooter);
export const buildSite = gulp.series(siteTmp, inject, site, copySite);
export const assets = gulp.series(
  gulp.parallel(styles, scripts, fonts, images),
  gulp.series(copyAssets)
);
export const clean = gulp.parallel(
  cleanAssets,
  cleanGzip,
  cleanDist,
  cleanSite
);
export const build = gulp.series(clean, assets, buildSite, minifyHTML);
export const show = gulp.series(serve);
export const dev = gulp.series(build, serve);

export default dev;
