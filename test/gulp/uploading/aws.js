'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../../generators/gulp'))
    .withOptions({uploading: 'Amazon S3'})
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates package.json file', () => {
  assert.file('package.json');
});

test('creates correct credentials file', () => {
  assert.file('aws-credentials.json');
  assert.noFile('rsync-credentials.json');
});

test('contain correct uploading packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '^3.2.0',
      'concurrent-transform': '^1.0.0'
    }
  });
});

test('does not contain wrong uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-rsync': '',
      'gulp-gh-pages': ''
    }
  });
});

test('contains upload task', () => {
  [
    'const fs',
    'const gulp',
    'const parallelize',
    'const awspublish',
    'gulp.task(\'upload'
  ].forEach(field => {
    assert.fileContent('gulp/tasks/uploading.js', field);
  });
});

test('does not contain wrong uploading tasks', () => {
  [
    'const rsync',
    'const ghpages'
  ].forEach(field => {
    assert.noFileContent('gulp/tasks/uploading.js', field);
  });
});
