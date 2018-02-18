# generator-statisk [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]
> The base for my statisk site Yeoman generators

## About
This is the base generator that I build my other generators on, currently
[generator-jekyllized][jekyllized]. It provides a bare bones gulp setup that can
be used to develop other generators or use in your project to build and optimize
your assets and such, though it'll probably require tinkering with the paths
used in the gulp tasks.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-statisk using
[npm](https://www.npmjs.com/) (we assume you have pre-installed
[node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-statisk
```

Then generate your new project:

```bash
yo statisk
```

## License

MIT © [Sondre Nilsen](https://github.com/sondr3)

[jekyllized]: https://github.com/sondr3/generator-jekyllized
[hugo]: https://github.com/sondr3/generator-hugo
[npm-image]: https://badge.fury.io/js/generator-statisk.svg
[npm-url]: https://npmjs.org/package/generator-statisk
[travis-image]: https://travis-ci.org/sondr3/generator-statisk.svg?branch=overhaul
[travis-url]: https://travis-ci.org/sondr3/generator-statisk
[codecov-image]: https://codecov.io/gh/sondr3/generator-statisk/branch/overhaul/graph/badge.svg
[codecov-url]: https://codecov.io/gh/sondr3/generator-statisk
