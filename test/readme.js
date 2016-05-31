'use strict';
var path = require('path');
var test = require('ava');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

test.before(() => {
  return helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      projectName: 'static',
      projectDescription: 'A static generator',
      projectURL: 'github.com/someone/else',
      authorName: 'Ola Nordmann'
    })
    .withOptions({'skip-install': true})
    .toPromise();
});

test('generates README.md', () => {
  assert.file([
    'README.md'
  ]);
});

test('README is correct', () => {
  [
    '# static',
    '> A static generator',
    '[Ola Nordmann](github.com/someone/else)'
  ].forEach(field => {
    assert.fileContent('README.md', field);
  });
});
