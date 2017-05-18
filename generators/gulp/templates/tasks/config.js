'use strict';

export const src = {
  scss: 'src/assets/scss',
  js: './assets/javascript',
  images: 'src/assets/images',
  fonts: 'src/assets/fonts',
  html: 'dist',
  svg: 'src',
  assets: '.tmp/assets',
  site: '.tmp/dist'
};

export const dest = {
  scss: '.tmp/assets/stylesheets',
  js: '../.tmp/assets/javascript',
  images: '.tmp/assets/images',
  fonts: '.tmp/assets/fonts',
  html: 'dist',
  svg: '.tmp',
  assets: 'dist/assets',
  site: 'dist'
};

export const server = {
  server: ['.tmp', 'dist'],
  files: ['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'],
  extra: ['src/**/*.xml', 'src/**/*.txt'],
  js: 'src/assets/javascript'
};

export const clean = {
  assets: [
    '.tmp/**/*',
    '!.tmp/assets',
    '!.tmp/assets/images',
    '!.tmp/assets/images/**/*',
    'dist/assets'
  ],
  images: ['.tmp/assets/images', 'dist/assets/images'],
  dist: ['dist/', '.tmp/dist'],
  gzip: ['dist/**/*.gz'],
  site: ['.tmp/src']
};
