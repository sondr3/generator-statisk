'use strict';

var _ = require('lodash');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('uploading', {
      required: true,
      name: 'uploading',
      type: 'list',
      message: 'How do you want to upload your site?',
      choices: ['Amazon S3', 'Rsync', 'Github Pages', 'None']
    });

    this.option('babel', {
      required: true,
      name: 'Use Babel'
    });

    this.option('name', {
      required: true,
      name: 'Generator name',
      desc: 'Generator used to generate gulpfile'
    });

    this.option('version', {
      required: true,
      name: 'Generator version',
      desc: 'Version of generator used to generate gulpfile'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      pkg.devDependencies = pkg.devDependencies || {};
      _.extend(pkg.devDependencies, {
        'autoprefixer': '^6.2.3',
        'babel-preset-es2015': '^6.9.0',
        'browser-sync': '^2.11.0',
        'del': '^2.2.0',
        'gulp': 'git://github.com/gulpjs/gulp.git#4.0',
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
        'gulp-uglify': '^1.5.1',
        'require-dir': '^0.3.0',
        'shelljs': '^0.7.0',
        'yargs': '^4.7.0'
      });

      if (this.options.babel) {
        pkg.devDependencies['gulp-babel'] = '^6.1.2';
      }

      if (this.options.uploading === 'Amazon S3') {
        pkg.devDependencies['gulp-awspublish'] = '^3.2.0';
        pkg.devDependencies['concurrent-transform'] = '^1.0.0';
      }

      if (this.options.uploading === 'Rsync') {
        pkg.devDependencies['gulp-rsync'] = '^0.0.6';
      }

      if (this.options.uploading === 'Github Pages') {
        pkg.devDependencies['gh-pages'] = '^0.11.0';
      }

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    },

    gulpfile: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          date: (new Date()).toISOString().split('T')[0],
          name: this.options.name,
          version: this.options.version,
          amazonS3: this.options.uploading === 'Amazon S3',
          rsync: this.options.uploading === 'Rsync',
          ghpages: this.options.uploading === 'Github Pages',
          noUpload: this.options.uploading === 'None',
          babel: this.options.babel
        }
      );

      if (this.options.uploading === 'Amazon S3') {
        this.fs.copyTpl(
          this.templatePath('aws-credentials.json'),
          this.destinationPath('aws-credentials.json')
        );
      }

      if (this.options.uploading === 'Rsync') {
        this.fs.copyTpl(
          this.templatePath('rsync-credentials.json'),
          this.destinationPath('rsync-credentials.json')
        );
      }
    }
  }
});
