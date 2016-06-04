'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../../generators/gulp'))
    .withOptions({uploading: 'Rsync'})
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates credentials file', () => {
  assert.file('rsync-credentials.json');
  assert.noFile('aws-credentials.json');
});

test('creates package.json file', () => {
  assert.file('package.json');
});

test('contain correct uploading packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'gulp-rsync': '^0.0.6'
    }
  });
});

test('does not contain wrong uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '',
      'concurrent-transform': '',
      'gulp-gh-pages': ''
    }
  });
});

test('contains upload function', () => {
  [
    'const fs',
    'const gulp',
    'const rsync',
    'gulp.task(\'upload'
  ].forEach(field => {
    assert.fileContent('gulp/tasks/uploading.js', field);
  });
});

test('does not contain the wrong uploading task', () => {
  [
    'const parallelize',
    'const awspublish',
    'const ghpages'
  ].forEach(field => {
    assert.noFileContent('gulp/tasks/uploading.js', field);
  });
});
