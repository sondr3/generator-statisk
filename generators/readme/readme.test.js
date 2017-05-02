'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers
    .run(path.join(__dirname, '../app'))
    .withPrompts({
      projectName: 'statisk',
      projectDescription: 'A statisk generator',
      projectURL: 'github.com/olanordmann/statisk',
      authorName: 'Ola Nordmann'
    })
    .withOptions({ 'skip-install': true })
    .toPromise();
});

test('generates README.md', () => {
  assert.file(['README.md']);
});

test('README is correct', () => {
  [
    '# statisk',
    '> A statisk generator',
    '[Ola Nordmann](github.com/olanordmann/statisk)'
  ].forEach(field => {
    assert.fileContent('README.md', field);
  });
});
