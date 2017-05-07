'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('babel', {
      type: String,
      required: true
    });

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

    pkg.devDependencies = pkg.devDependencies || {};
    _.extend(pkg.devDependencies, {
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
    });

    if (this.options.babel) {
      pkg.devDependencies['gulp-babel'] = '^6.1.2';
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copyTpl(
      this.templatePath('gulpfile'),
      this.destinationPath('gulpfile.js'),
      {
        date: new Date().toISOString().split('T')[0],
        name: this.options.name,
        version: this.options.version,
        buildContent: this.options.buildContent,
        babel: this.options.babel
      }
    );
  }
};
