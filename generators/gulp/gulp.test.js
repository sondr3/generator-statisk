'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

beforeAll(() => {
  const pkg = require('../../package.json');

  return helpers
    .run(path.join(__dirname, '.'))
    .withOptions({
      name: pkg.name,
      version: pkg.version,
      'skip-install': true,
      uploading: 'None',
      babel: false
    })
    .toPromise();
});

test('creates gulpfile', () => {
  assert.file('gulpfile.js');
});

test('creates comment about creation', () => {
  const pkg = require('../../package.json');

  const date = new Date().toISOString().split('T')[0];
  assert.fileContent(
    'gulpfile.js',
    '// generated on ' + date + ' using ' + pkg.name + ' ' + pkg.version
  );
});

test('does not create credentials files', () => {
  assert.noFile(['aws-credentials.json', 'rsync-credentials.json']);
});

test('does not contain uploading packages', () => {
  assert.noJsonFileContent('package.json', {
    devDependencies: {
      'gulp-awspublish': '',
      'gulp-babel': '',
      'concurrent-transform': '',
      'gulp-rsync': '',
      'gulp-gh-pages': ''
    }
  });
});

test('does not contain deploy task', () => {
  assert.noFileContent('gulpfile.js', "gulp.task('upload");
  assert.noFileContent('gulpfile.js', "gulp.task('deploy");
});

test('contains default gulp tasks', () => {
  [
    'clean:assets',
    'clean:images',
    'clean:dist',
    'clean:gzip',
    'clean:site',
    'scripts',
    'styles',
    'serve',
    'fonts',
    'html',
    'images',
    'copy:assets',
    'copy:site',
    'inject:head',
    'inject:footer',
    'inject',
    'build:site',
    'assets',
    'clean',
    'rebuild',
    'build',
    'check',
    'default'
  ].forEach(function(task) {
    assert.fileContent('gulpfile.js', "gulp.task('" + task);
  });
});

test('contains reload function', () => {
  assert.fileContent('gulpfile.js', 'function reload');
});

test('creates package.json', () => {
  assert.file('package.json');
});

test('package.json contains correct packages', () => {
  assert.jsonFileContent('package.json', {
    devDependencies: {
      autoprefixer: '^6.2.3',
      'babel-preset-es2015': '^6.9.0',
      'browser-sync': '^2.11.0',
      del: '^2.2.0',
      gulp: 'git://github.com/gulpjs/gulp.git#4.0',
      'gulp-cache': '^0.4.1',
      'gulp-concat': '^2.6.0',
      'gulp-cssnano': '^2.1.0',
      'gulp-gzip': '^1.1.0',
      'gulp-htmlmin': '^2.0.0',
      'gulp-if': '^2.0.0',
      'gulp-imagemin': '^3.0.0',
      'gulp-inject': '^4.0.0',
      'gulp-load-plugins': '^1.3.0',
      'gulp-newer': '^1.1.0',
      'gulp-postcss': '^6.0.0',
      'gulp-rename': '^1.2.2',
      'gulp-rev': '^7.0.0',
      'gulp-sass': '^2.1.1',
      'gulp-size': '^2.0.0',
      'gulp-sourcemaps': '^1.3.0',
      'gulp-uglify': '^2.0.0',
      shelljs: '^0.7.0',
      yargs: '^5.0.0'
    }
  });
});
