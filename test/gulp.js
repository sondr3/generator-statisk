'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/gulp'))
    .withOptions({
      'skip-install': true,
      'uploading': 'None',
      'babel': false
    })
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates gulp task files', () => {
  assert.file([
    'gulp/tasks/browsersync.js',
    'gulp/tasks/clean.js',
    'gulp/tasks/copy.js',
    'gulp/tasks/fonts.js',
    'gulp/tasks/html.js',
    'gulp/tasks/images.js',
    'gulp/tasks/inject.js',
    'gulp/tasks/scripts.js',
    'gulp/tasks/style.js',
    'gulp/tasks/uploading.js'
  ]);
});

test('does not create credentials files', () => {
  assert.noFile([
    'aws-credentials.json',
    'rsync-credentials.json'
  ]);
});

test('does not contain uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '',
      'gulp-babel': '',
      'concurrent-transform': '',
      'gulp-rsync': '',
      'gulp-gh-pages': ''
    }
  });
});

test('contains default gulp tasks', () => {
  [
    'inject',
    'build:site',
    'assets',
    'clean',
    'rebuild',
    'build',
    'deploy',
    'check',
    'default'
  ].forEach(function (task) {
    assert.fileContent('gulpfile.js', 'gulp.task(\'' + task);
  });
});

test('creates package.json', () => {
  assert.file('package.json');
});

test('package.json contains correct packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'autoprefixer': '^6.2.3',
      'browser-sync': '^2.11.0',
      'del': '^2.2.0',
      'gulp': 'git://github.com/gulpjs/gulp.git#4.0',
      'gulp-cache': '^0.4.1',
      'gulp-concat': '^2.6.0',
      'gulp-cssnano': '^2.1.0',
      'gulp-eslint': '^2.0.0',
      'gulp-gzip': '^1.1.0',
      'gulp-htmlmin': '^2.0.0',
      'gulp-if': '^2.0.0',
      'gulp-imagemin': '^3.0.0',
      'gulp-inject': '^4.0.0',
      'gulp-load-plugins': '^1.2.0',
      'gulp-newer': '^1.1.0',
      'gulp-postcss': '^6.0.0',
      'gulp-rename': '^1.2.2',
      'gulp-rev': '^7.0.0',
      'gulp-sass': '^2.1.1',
      'gulp-size': '^2.0.0',
      'gulp-sourcemaps': '^1.3.0',
      'gulp-uglify': '^1.5.1',
      'gulp-uncss': '^1.0.0',
      'shelljs': '^0.7.0',
      'yargs': '^4.7.0'
    }
  });
});

