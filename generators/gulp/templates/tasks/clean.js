'use strict';

import gulp from 'gulp';
import del from 'del';

export function cleanAssets() {
  return del([
    '.tmp/**/*',
    '!.tmp/assets',
    '!.tmp/assets/images',
    '!.tmp/assets/images/**/*',
    'dist/assets'
  ]);
}

export function cleanImages() {
  return del(['.tmp/assets/images', 'dist/assets/images']);
}

export function cleanDist() {
  return del(['dist/', '.tmp/dist']);
}

export function cleanGzip() {
  return del(['dist/**/*.gz']);
}

export function cleanSite() {
  return del(['.tmp/src']);
}
