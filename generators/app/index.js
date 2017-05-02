'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('babel', {
      type: Boolean,
      required: false,
      desc: 'Compile your JS with Babel'
    });

    this.option('readme', {
      type: String,
      required: false,
      desc: 'Content to insert into README.md'
    });

    this.option('buildContent', {
      type: String,
      requred: true,
      desc: 'Gulp tasks to build your site with your static site generator'
    });
  }

  initializing() {
    this.props = {};
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  }

  prompting() {
    var questions = [
      {
        name: 'projectName',
        message: 'Project name',
        store: true
      },
      {
        name: 'projectDescription',
        message: 'Project description',
        store: true
      },
      {
        name: 'projectURL',
        message: 'Project URL',
        store: true
      },
      {
        name: 'authorName',
        message: "What's your name?",
        store: true
      },
      {
        name: 'authorEmail',
        message: "What's your email?",
        store: true
      },
      {
        name: 'uploading',
        type: 'list',
        message: 'How do you want to upload your site?',
        choices: ['Amazon S3', 'Rsync', 'Github Pages', 'None'],
        store: true
      },
      {
        name: 'babel',
        type: 'confirm',
        message: 'Compile your JS with Babel?',
        when: this.options.babel === undefined
      }
    ];

    return this.prompt(questions).then(
      function(props) {
        this.props = props;
      }.bind(this)
    );
  }

  writing() {
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
  }

  default() {
    this.composeWith(require.resolve('../editorconfig'));

    this.composeWith(require.resolve('../git'));

    this.composeWith(require.resolve('../gulp'), {
      uploading: this.props.uploading,
      babel: this.props.babel
    });

    this.composeWith(require.resolve('../readme'), {
      projectName: this.props.projectName,
      projectDescription: this.props.projectDescription,
      projectURL: this.props.projectURL,
      authorName: this.props.authorName,
      content: this.options.readme
    });
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
