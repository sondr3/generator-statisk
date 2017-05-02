'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  return helpers.run(path.join(__dirname, '.'))
    .withPrompts({
      projectName: 'statisk',
      projectDescription: 'A statisk generator',
      projectURL: 'github.com/olanordmann/statisk',
      authorName: 'Ola Nordmann',
      authorEmail: 'ola.nordmann@gmail.com'
    })
    .withOptions({'skip-install': true})
    .toPromise();
});

test('generates expected files', () => {
  assert.file([
    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    'README.md'
  ]);
});

test('creates package.json correctly', () => {
  assert.file('package.json');
  assert.jsonFileContent('package.json', {
    name: 'statisk',
    description: 'A statisk generator',
    homepage: 'github.com/olanordmann/statisk',
    author: {
      name: 'Ola Nordmann',
      email: 'ola.nordmann@gmail.com'
    }
  });
});
