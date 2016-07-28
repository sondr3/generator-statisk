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

test('creates assets.js', () => {
  assert.file('gulp/tasks/assets.js');
});

test('contains correct tasks', () => {
  [
    'scripts',
    'styles',
    'serve'
  ].forEach(function (task) {
    assert.fileContent('gulp/tasks/assets.js', 'gulp.task(\'' + task);
  });
});

test('contains reload function', () => {
  assert.fileContent('gulp/tasks/assets.js', 'function reload');
});
