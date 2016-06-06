<a name="0.3.0"></a>
## 0.3.0
> 2016-06-06

Removed a bunch of unused and unneeded parts, packages and dependencies from
both the generator and the generated project. Also simplified a few of the main
tasks in `gulpfile.js` because I was being overly redundant with `gulp.series`.
Also fixed a few problems with newlines when choosing gulp-babel and fixed the
comment being generated in the `gulpfile.js`.

#### Changelog:
* [[`c4a51142ea`](https://github.com/sondr3/generator-statisk/commit/c4a51142ea)] - Minor change to options for babel
* [[`19138a4163`](https://github.com/sondr3/generator-statisk/commit/19138a4163)] - Fix newline issues with EJS templates
* [[`3260158635`](https://github.com/sondr3/generator-statisk/commit/3260158635)] - Remove unused packages
* [[`32550b53d6`](https://github.com/sondr3/generator-statisk/commit/32550b53d6)] - Update test for comment about creation etc
* [[`d6f31a4eca`](https://github.com/sondr3/generator-statisk/commit/d6f31a4eca)] - Fix generating the name and version in gulpfile
* [[`a4d7a8cf88`](https://github.com/sondr3/generator-statisk/commit/a4d7a8cf88)] - Simplify gulp tasks
* [[`ab47b46497`](https://github.com/sondr3/generator-statisk/commit/ab47b46497)] - Fix "main" keyword in package.json
* [[`f6e3800b45`](https://github.com/sondr3/generator-statisk/commit/f6e3800b45)] - Remove unused dependencies
* [[`f61965ba9b`](https://github.com/sondr3/generator-statisk/commit/f61965ba9b)] - Remove unneeded parts of the generator
* [[`30373fc090`](https://github.com/sondr3/generator-statisk/commit/30373fc090)] - Update Readme \[ci skip\]

<a name="0.2.2"></a>
## 0.2.2
> 2016-06-05

Added the date and version of the generator that was used to generate the
gulpfile.

#### Changelog:
* [[`182e5afb44`](https://github.com/sondr3/generator-statisk/commit/182e5afb44)] - Add version and date to the gulpfile

<a name="0.2.1"></a>
## 0.2.1
> 2016-06-05

Added some packages that I forgot to add when changing the gulpfiles to be
separate files.

#### Changelog:
* [[`69ce502d14`](https://github.com/sondr3/generator-statisk/commit/69ce502d14)] - Forgot to add some packages

<a name="0.2.0"></a>
## 0.2.0
> 2016-06-05

Added the gulp subgenerator and can now rip it out of my other generators. Major
changes from how it used to be is that the tasks are split up into separate
files. I initially wanted to have the paths in their own paths file but found it
really cumbersome and not what I wanted after all.

Also did some minor fixups of the cleanup during the default `gulp build` task.

#### Changelog:
* [[`0e34685faa`](https://github.com/sondr3/generator-statisk/commit/0e34685faa)] - The deploy task should only be there when needed
* [[`df347cab7b`](https://github.com/sondr3/generator-statisk/commit/df347cab7b)] - Add uploading, fix babel and ESlint
* [[`98b40459e7`](https://github.com/sondr3/generator-statisk/commit/98b40459e7)] - Babel is included by default...
* [[`e1b22cc5eb`](https://github.com/sondr3/generator-statisk/commit/e1b22cc5eb)] - Fix redundant cleaning of files
* [[`3c5d7d39ed`](https://github.com/sondr3/generator-statisk/commit/3c5d7d39ed)] - Fix errors with removing paths.json
* [[`e8411f3a20`](https://github.com/sondr3/generator-statisk/commit/e8411f3a20)] - ***Revert*** "using a paths.json file, I don't like it"
* [[`dd85a0b628`](https://github.com/sondr3/generator-statisk/commit/dd85a0b628)] - First pass at making build commands generic
* [[`308919fd35`](https://github.com/sondr3/generator-statisk/commit/308919fd35)] - Fix some paths not being correctly applied
* [[`a0aff79505`](https://github.com/sondr3/generator-statisk/commit/a0aff79505)] - Add tests for Gulp tasks and files
* [[`abed406bec`](https://github.com/sondr3/generator-statisk/commit/abed406bec)] - Initial commit of gulp subgenerator

<a name="0.1.1"></a>
## 0.1.1
> 2016-06-01

The `git` generator now quietly initializes a git repo in your current directory
and added support to add custom content to the README so the various generators
can actually have a useful README.

#### Changelog:
* [[`2949a48b83`](https://github.com/sondr3/generator-statisk/commit/2949a48b83)] - Add support for custom content in the README
* [[`99126eed20`](https://github.com/sondr3/generator-statisk/commit/99126eed20)] - Init git and skip bower install

<a name="0.1.0"></a>
## 0.1.0
> 2016-06-01

First release of my base generator that I plan to build my other generators on
top of. This is a very, very basic release.

##### Changelog:
* [[`f227adc2ac`](https://github.com/sondr3/generator-statisk/commit/f227adc2ac)] - Update travis settings
* [[`98b79cd075`](https://github.com/sondr3/generator-statisk/commit/98b79cd075)] - Rename and remove gulpfile
* [[`759ddfcef2`](https://github.com/sondr3/generator-statisk/commit/759ddfcef2)] - Remove dummyfile
* [[`f6eca8184f`](https://github.com/sondr3/generator-statisk/commit/f6eca8184f)] - Readme generator, added a bunch more tests
* [[`b9b909d166`](https://github.com/sondr3/generator-statisk/commit/b9b909d166)] - Add basic generators
* [[`6ab97626b8`](https://github.com/sondr3/generator-statisk/commit/6ab97626b8)] - Initial commit
