'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers.run(path.join(__dirname, '.'))
    .withOptions({uploading: 'None'})
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates package.json file', () => {
  assert.file('package.json');
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
      'concurrent-transform': '',
      'gulp-rsync': '',
      'gulp-gh-pages': ''
    }
  });
});

test('does not contain deploy task', () => {
  assert.noFileContent('gulpfile.js', 'gulp.task(\'upload\'');
  assert.noFileContent('gulpfile.js', 'gulp.task(\'deploy\'');
});
