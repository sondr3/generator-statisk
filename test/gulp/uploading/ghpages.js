'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../../generators/gulp'))
    .withOptions({uploading: 'Github Pages'})
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates package.json file', () => {
  assert.file('package.json');
});

test('contain correct uploading packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'gulp-gh-pages': '^0.5.2'
    }
  });
});

test('does not contain wrong uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '',
      'concurrent-transform': '',
      'gulp-rsync': ''
    }
  });
});

test('contains deploy function', () => {
  [
    'const gulp',
    'const ghpages',
    'gulp.task(\'upload'
  ].forEach(field => {
    assert.fileContent('gulp/tasks/uploading.js', field);
  });
});

test('does not contain the wrong uploading task', () => {
  [
    'const parallelize',
    'const awspublish',
    'const rsync'
  ].forEach(field => {
    assert.noFileContent('gulp/tasks/uploading.js', field);
  });
});