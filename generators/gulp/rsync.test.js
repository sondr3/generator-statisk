'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers
    .run(path.join(__dirname, '.'))
    .withOptions({ uploading: 'Rsync' });
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
    'reads from your Rsync credentials file',
    "gulp.task('upload"
  ].forEach(field => {
    assert.fileContent('gulpfile.js', field);
  });
});

test('does not contain the wrong uploading task', () => {
  [
    'const parallelize',
    'reads from your AWS credentials file',
    'const ghPages'
  ].forEach(field => {
    assert.noFileContent('gulpfile.js', field);
  });
});
