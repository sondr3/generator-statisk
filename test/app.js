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
    'README.md',
    'dummyfile.txt'
  ]);
});

test('creates package.json correctly', () => {
  assert.file('package.json');
  assert.jsonFileContent('package.json', {
    name: 'static',
    description: 'A static generator',
    homepage: 'github.com/someone/else',
    author: {
      name: 'Ola Nordmann',
      email: 'ola.nordmann@gmail.com'
    }
  });
});
