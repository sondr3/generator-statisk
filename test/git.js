'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/git'))
    .withOptions({'skip-install': true})
    .toPromise();
});

test('generates expected files', () => {
  assert.file([
    '.gitattributes',
    '.gitignore'
  ]);
});
