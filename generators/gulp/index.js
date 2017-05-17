'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Generator used to generate gulpfile'
    });

    this.option('version', {
      type: String,
      required: true,
      desc: 'Version of generator used to generate gulpfile'
    });

    this.option('buildContent', {
      type: String,
      required: true,
      desc: 'Gulp tasks to build your site with your static site generator'
    });
  }

  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    pkg.scripts = pkg.scripts || {};
    _.extend(pkg.scripts, {
      start: 'gulp --require babel-register --gulpfile ./tasks',
      serve: 'gulp show --require babel-register --gulpfile ./tasks',
      build: 'gulp build --require babel-register --gulpfile ./tasks',
      prod: 'NODE_ENV=production gulp build --require babel-register --gulpfile ./tasks'
    });

    pkg.babel = pkg.babel || {};
    _.extend(pkg.babel, {
      babel: {
        presets: ['es2015'],
        babelrc: false
      }
    });

    pkg.devDependencies = pkg.devDependencies || {};
    _.extend(pkg.devDependencies, {
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
    });

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('tasks/index.js'),
      {
        date: new Date().toISOString().split('T')[0],
        name: this.options.name,
        version: this.options.version,
        buildContent: this.options.buildContent
      }
    );

    this.fs.copy(this.templatePath('tasks/'), this.destinationPath('tasks/'));
  }
};
