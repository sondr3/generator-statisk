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
      'babel': true
    })
    .toPromise();
});

test('creates gulpfile.js', () => {
  assert.file('gulpfile.js');
});

test('contains babel', () => {
  [
    '.pipe($.babel({'
  ].forEach(field => {
    assert.fileContent('gulpfile.js', field);
  });
});

test('creates package.json', () => {
  assert.file('package.json');
});

test('contains gulp-babel', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      'gulp-babel': '^6.1.2'
    }
  });
});
