'use strict';
var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('readme', {
      type: String,
      required: false,
      desc: 'Content to insert into README.md'
    });
  },

  initializing: function () {
    this.props = {};
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: function () {
    var questions = [{
      name: 'projectName',
      message: 'Project name',
      store: true
    }, {
      name: 'projectDescription',
      message: 'Project description',
      store: true
    }, {
      name: 'projectURL',
      message: 'Project URL',
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
  },

  default: function () {
    this.composeWith('statisk:editorconfig', {}, {
      local: require.resolve('../editorconfig')
    });

    this.composeWith('statisk:git', {}, {
      local: require.resolve('../git')
    });

    this.composeWith('statisk:gulp', {
      options: {
        uploading: this.props.uploading
      }
    }, {
      local: require.resolve('../gulp')
    });

    this.composeWith('statisk:readme', {
      options: {
        projectName: this.props.projectName,
        projectDescription: this.props.projectDescription,
        projectURL: this.props.projectURL,
        authorName: this.props.authorName,
        content: this.options.readme
      }
    }, {
      local: require.resolve('../readme')
    });
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
