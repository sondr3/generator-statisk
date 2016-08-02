'use strict';
<% if (amazonS3) { -%>
const fs = require('fs');
const gulp = require('gulp');
const parallelize = require('concurrent-transform');
const awspublish = require('gulp-awspublish');

// 'gulp deploy' -- reads from your AWS Credentials file, creates the correct
// headers for your files and uploads them to S3
gulp.task('upload', () => {
  var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
  var publisher = awspublish.create(credentials);

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**/*', {dot: true})
    .pipe(awspublish.gzip())
    .pipe(parallelize(publisher.publish(headers), 30))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
<% } -%><% if (rsync) { -%>
const fs = require('fs');
const gulp = require('gulp');
const rsync = require('gulp-rsync');

// 'gulp deploy' -- reads from your Rsync credentials file and incrementally
// uploads your site to your server
gulp.task('upload', () => {
  var credentials = JSON.parse(fs.readFileSync('rsync-credentials.json', 'utf8'));

  return gulp.src('dist/**', {dot: true})
    .pipe(rsync({
      root: 'dist',
      hostname: credentials.hostname,
      username: credentials.username,
      destination: credentials.destination,
      incremental: true
    }));
});
<% } -%><% if (ghpages) { -%>
const gulp = require('gulp');
const ghpages = require('gulp-gh-pages');

// 'gulp deploy' -- pushes your dist folder to Github
gulp.task('upload', () => {
  return gulp.src('dist/**/*', {dot: true})
    .pipe(ghPages());
});
<% } -%>
<% if (noUpload) { -%>
// File empty but generated because of how Yeoman scaffolds files
<% } -%>
