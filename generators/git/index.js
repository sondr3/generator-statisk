'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  configuring: function () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
  },

  end: function () {
    this.spawnCommandSync('git', ['init', '--quiet'], {
      cwd: this.destinationPath()
    });
  }
});
