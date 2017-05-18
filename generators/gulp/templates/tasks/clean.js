'use strict';

import gulp from 'gulp';
import del from 'del';

import { clean as config } from './config';

export function cleanAssets() {
  return del(config.assets);
}

export function cleanImages() {
  return del(config.images);
}

export function cleanDist() {
  return del(config.dist);
}

export function cleanGzip() {
  return del(config.gzip);
}

export function cleanSite() {
  return del(config.site);
}
