const gulp = require('gulp');
const shell = require('shelljs');
const size = require('gulp-size');
const argv = require('yargs').argv;

const path = require('../paths.json');
// 'gulp jekyll:tmp' -- copies your Jekyll site to a temporary directory
// to be processed
gulp.task('jekyll:tmp', () =>
  gulp.src(path.jekyll.src)
    .pipe(gulp.dest(path.jekyll.dest))
    .pipe(size({title: 'Jekyll'}))
);

// 'gulp jekyll' -- builds your site with development settings
// 'gulp jekyll --prod' -- builds your site with production settings
gulp.task('jekyll', done => {
  if (!argv.prod) {
    shell.exec('jekyll build');
    done();
  } else if (argv.prod) {
    shell.exec('jekyll build --config _config.yml,_config.build.yml');
    done();
  }
});

// 'gulp doctor' -- literally just runs jekyll doctor
gulp.task('jekyll:doctor', done => {
  shell.exec('jekyll doctor');
  done();
});
