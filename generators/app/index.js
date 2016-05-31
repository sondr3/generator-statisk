'use strict';
var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('babel', {
      type: Boolean,
      required: false,
      desc: 'Compile your JS with Babel'
    });
  },

  initializing: function () {
    this.props = {};
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: function () {
    var questions = [{
      name: 'name',
      message: 'Project name',
      store: true
    }, {
      name: 'description',
      message: 'Project description',
      store: true
    }, {
      name: 'authorName',
      message: 'What\'s your name?',
      store: true
    }, {
      name: 'authorEmail',
      message: 'What\'s your email?',
      store: true
    }, {
      name: 'uploading',
      type: 'list',
      message: 'How do you want to upload your site?',
      choices: ['Amazon S3', 'Rsync', 'Github Pages', 'None'],
      store: true
    }, {
      name: 'babel',
      type: 'confirm',
      message: 'Compile your JS with Babel',
      when: this.options.babel === undefined
    }];

    return this.prompt(questions).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var pkgJSONFields = {
      name: _.kebabCase(this.props.projectName),
      version: '0.0.0',
      description: this.props.projectDescription,
      homepage: this.props.projectURL,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail
      }
    };

    this.fs.writeJSON('package.json', _.extend(pkgJSONFields, this.pkg));

    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  default: function () {
    this.composeWith('static:git', {}, {
      local: require.resolve('../git')
    });

    this.composeWith('static:editorconfig', {}, {
      local: require.resolve('../editorconfig')
    });
  },

  install: function () {
    this.installDependencies();
  }
});
