'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers
    .run(path.join(__dirname, '.'))
    .withOptions({ uploading: 'Amazon S3' });
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
    'const parallelize',
    'reads from your AWS credentials file',
    "gulp.task('upload"
  ].forEach(field => {
    assert.fileContent('gulpfile.js', field);
  });
});

test('does not contain wrong uploading tasks', () => {
  ['const ghPages', 'reads from your Rsync credentials file'].forEach(field => {
    assert.noFileContent('gulpfile.js', field);
  });
});
