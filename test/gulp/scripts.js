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

test('creates scripts.js', () => {
  assert.file('gulp/tasks/scripts.js');
});

test('contains correct tasks', () => {
  assert.fileContent('gulp/tasks/scripts.js', 'gulp.task(\'scripts');
});
