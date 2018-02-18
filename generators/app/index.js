"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option("gitignore", {
      type: String,
      required: false,
      desc: "Files and paths that should be ignored by git"
    });
  }

  default() {
    this.composeWith(require.resolve("../git"), {
      gitignore: this.options.gitignore
    });
  }
};
