'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../../generators/gulp'))
    .withOptions({
      'skip-install': true,
      'uploading': 'None',
      'babel': false
    })
    .toPromise();
});

test('creates inject.js', () => {
  assert.file('gulp/tasks/inject.js');
});

test('contains correct tasks', () => {
  [
    'inject:head',
    'inject:footer'
  ].forEach(field => {
    assert.fileContent('gulp/tasks/inject.js', 'gulp.task(\'' + field);
  });
});
