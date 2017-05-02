'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers
    .run(path.join(__dirname, '.'))
    .withOptions({ 'skip-install': true });
});

test('generates expected files', () => {
  assert.file(['.gitattributes', '.gitignore']);
});
