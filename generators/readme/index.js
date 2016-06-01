'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('projectName', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('projectDescription', {
      type: String,
      required: true,
      desc: 'Project description'
    });

    this.option('projectURL', {
      type: String,
      required: true,
      desc: 'Project URL'
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name'
    });

    this.option('content', {
      type: String,
      required: false,
      desc: 'Content to insert into README.md'
    });
  },

  configuring: function () {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.options.projectName,
        projectDescription: this.options.projectDescription,
        projectURL: this.options.projectURL,
        authorName: this.options.authorName,
        content: this.options.content
      }
    );
  }
});
