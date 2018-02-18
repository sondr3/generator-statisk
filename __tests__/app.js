"use strict";
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-statisk:app", () => {
  beforeAll(() => {
    return helpers
      .run(require.resolve("../generators/app"))
      .withGenerators([
        [helpers.createDummyGenerator(), "statisk:git"],
        [helpers.createDummyGenerator(), "statisk:editorconfig"]
      ]);
  });

  it("creates required files", () => {
    assert.file([".gitignore", ".gitattributes", ".editorconfig"]);
  });
});
