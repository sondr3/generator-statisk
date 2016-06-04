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

test('creates copy.js', () => {
  assert.file('gulp/tasks/copy.js');
});

test('contains correct tasks', () => {
  [
    'copy:assets',
    'copy:site'
  ].forEach(field => {
    assert.fileContent('gulp/tasks/copy.js', 'gulp.task(\'' + field);
  });
});
