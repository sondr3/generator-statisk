'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-statisk :: gulp', () => {
  beforeAll(() => {
    const pkg = require('../../package.json');

    return helpers.run(path.join(__dirname, '.')).withOptions({
      name: pkg.name,
      version: pkg.version,
      'skip-install': true
    });
  });

  test('creates comment about creation', () => {
    const pkg = require('../../package.json');

    const date = new Date().toISOString().split('T')[0];
    assert.fileContent(
      'tasks/index.js',
      '// generated on ' + date + ' using ' + pkg.name + ' ' + pkg.version
    );
  });

  test('creates package.json', () => {
    assert.file('package.json');
  });

  test('package.json contains correct packages', () => {
    assert.jsonFileContent('package.json', {
      devDependencies: {
        autoprefixer: '^7.1.0',
        'babel-preset-es2015': '^6.9.0',
        'babel-core': '^6.24.1',
        'babel-loader': '^7.0.0',
        'babel-preset-env': '^1.4.0',
        'babel-preset-es2015': '^6.24.1',
        'browser-sync': '^2.18.11',
        del: '^2.2.0',
        gulp: 'git://github.com/gulpjs/gulp.git#4.0',
        'gulp-cache': '^0.4.1',
        'gulp-clean-css': '^3.3.1',
        'gulp-gzip': '^1.1.0',
        'gulp-htmlmin': '^3.0.0',
        'gulp-if': '^2.0.0',
        'gulp-imagemin': '^3.0.0',
        'gulp-inject': '^4.0.0',
        'gulp-postcss': '^7.0.0',
        'gulp-rename': '^1.2.2',
        'gulp-rev': '^7.0.0',
        'gulp-sass': '^3.1.0',
        'gulp-size': '^2.0.0',
        'gulp-sourcemaps': '^2.6.0',
        shelljs: '^0.7.0',
        webpack: '^2.5.1',
        'webpack-dev-middleware': '^1.10.2',
        'webpack-dev-server': '^2.4.5',
        'webpack-hot-middleware': '^2.18.0'
      }
    });
  });

  test('creates gulp files', () => {
    [
      'browsersync.js',
      'clean.js',
      'copy.js',
      'fonts.js',
      'html.js',
      'images.js',
      'index.js',
      'scripts.js',
      'styles.js',
      'svg.js'
    ].forEach(file => {
      assert.file('tasks/' + file);
    });
  });
});
