'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../generators/gulp'))
    .withOptions({
      'skip-install': true,
      'uploading': 'None'
    })
    .toPromise();
});

test('creates clean.js', () => {
  assert.file('gulp/tasks/clean.js');
});

test('contains correct tasks', () => {
  [
    'clean:assets',
    'clean:images',
    'clean:dist',
    'clean:gzip',
    'clean:site'
  ].forEach(field => {
    assert.fileContent('gulp/tasks/clean.js', 'gulp.task(\'' + field);
  });
});
