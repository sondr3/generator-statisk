// generated on <%= date %> using <%= name %> <%= version %>
'use strict';

<%  if (amazonS3 || rsync) { -%>
const fs = require('fs');<% } -%>
const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const shell = require('shelljs');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();<% if (amazonS3) { %>
const parallelize = require('concurrent-transform');<% } %><% if (ghpages) { %>
const ghPages = require('gh-pages')<% } %>

// Various tasks for deleting assets etc
gulp.task('clean:assets', () => {
  return del(['.tmp/**/*', '!.tmp/assets', '!.tmp/assets/images', '!.tmp/assets/images/**/*', 'dist/assets']);
});
gulp.task('clean:images', () => {
  return del(['.tmp/assets/images', 'dist/assets/images']);
});
gulp.task('clean:dist', () => {
  return del(['dist/', '.tmp/dist']);
});
gulp.task('clean:gzip', () => {
  return del(['dist/**/*.gz']);
});
gulp.task('clean:site', () => {
  return del(['.tmp/src']);
});
<%- buildContent -%>

// 'gulp scripts' -- creates a index.js file from your JavaScript files and
// creates a sourcemap for it
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
// minifies, gzips and cache busts it. Does not create a sourcemap
gulp.task('scripts', () =>
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  gulp.src([
    'src/assets/javascript/vendor.js',
    'src/assets/javascript/main.js'
  ])
    .pipe($.newer('.tmp/assets/javascript/index.js', {dest: '.tmp/assets/javascript', ext: '.js'}))
    .pipe($.if(!argv.prod, $.sourcemaps.init()))<% if (babel) { %>
    .pipe($.babel({
      presets: ['es2015']
    }))<% } %>
    .pipe($.concat('index.js'))
    .pipe($.size({
      showFiles: true
    }))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.if('*.js', $.uglify({preserveComments: 'some'}))))
    .pipe($.if(argv.prod, $.size({
      showFiles: true
    })))
    .pipe($.if(argv.prod, $.rev()))
    .pipe($.if(!argv.prod, $.sourcemaps.write('.')))
    .pipe($.if(argv.prod, gulp.dest('.tmp/assets/javascript')))
    .pipe($.if(argv.prod, $.if('*.js', $.gzip({append: true}))))
    .pipe($.if(argv.prod, $.size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/javascript'))
);

// 'gulp styles' -- creates a CSS file from your SASS, adds prefixes and
// creates a sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SASS, adds prefixes and
// then minifies, gzips and cache busts it. Does not create a sourcemap
gulp.task('styles', () =>
  gulp.src('src/assets/scss/style.scss')
    .pipe($.if(!argv.prod, $.sourcemaps.init()))
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({browsers: 'last 1 version'})
    ]))
    .pipe($.size({
      showFiles: true
    }))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.if('*.css', $.cssnano({autoprefixer: false}))))
    .pipe($.if(argv.prod, $.size({
      showFiles: true
    })))
    .pipe($.if(argv.prod, $.rev()))
    .pipe($.if(!argv.prod, $.sourcemaps.write('.')))
    .pipe($.if(argv.prod, gulp.dest('.tmp/assets/stylesheets')))
    .pipe($.if(argv.prod, $.if('*.css', $.gzip({append: true}))))
    .pipe($.if(argv.prod, $.size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    .pipe($.if(!argv.prod, browserSync.stream()))
);

// 'gulp html' -- does nothing
// 'gulp html --prod' -- minifies and gzips our HTML files
gulp.task('html', () =>
  gulp.src('dist/**/*.html')
    .pipe($.if(argv.prod, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    })))
    .pipe($.if(argv.prod, $.size({title: 'optimized HTML'})))
    .pipe($.if(argv.prod, gulp.dest('dist')))
    .pipe($.if(argv.prod, $.gzip({append: true})))
    .pipe($.if(argv.prod, $.size({
      title: 'gzipped HTML',
      gzip: true
    })))
    .pipe($.if(argv.prod, gulp.dest('dist')))
);

// 'gulp images' -- optimizes and caches your images
gulp.task('images', () =>
  gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin([
      $.imagemin.gifsicle({interlaced: true}),
      $.imagemin.jpegtran({progressive: true}),
      $.imagemin.optipng(),
      $.imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ])))
    .pipe(gulp.dest('.tmp/assets/images'))
    .pipe($.size({title: 'images'}))
);

// 'gulp inject:head' -- injects our style.css file into the head of our HTML
gulp.task('inject:head', () =>
  gulp.src('.tmp/src/_includes/head.html')
    .pipe($.inject(gulp.src('.tmp/assets/stylesheets/*.css'), {ignorePath: '.tmp'}))
    .pipe(gulp.dest('.tmp/src/_includes'))
);

// 'gulp inject:footer' -- injects our index.js file into the end of our HTML
gulp.task('inject:footer', () =>
  gulp.src('.tmp/src/_layouts/default.html')
    .pipe($.inject(gulp.src('.tmp/assets/javascript/*.js'), {ignorePath: '.tmp'}))
    .pipe(gulp.dest('.tmp/src/_layouts'))
);

// 'gulp assets:copy' -- copies the assets into the dist directory, needs to be
// done this way because Jekyll overwrites the whole directory otherwise
gulp.task('copy:assets', () =>
  gulp.src('.tmp/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
);

// 'gulp jekyll:copy' -- copies your processed Jekyll site to the dist directory
gulp.task('copy:site', () =>
  gulp.src('.tmp/dist/**/*')
    .pipe(gulp.dest('dist'))
);

// 'gulp fonts' -- copies your fonts to the temporary assets directory
gulp.task('fonts', () =>
  gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('.tmp/assets/fonts'))
    .pipe($.size({title: 'fonts'}))
);

// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open up your website in your browser and watch for changes
// in all your files and update them $.if needed
gulp.task('serve', (done) => {
  browserSync.init({
    // tunnel: true,
    // open: false,
    server: ['.tmp', 'dist']
  });
  done();

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('build:site', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('site', reload));
  gulp.watch('src/assets/javascript/**/*.js', gulp.series('scripts', reload));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
});

<% if (amazonS3) { -%>
// 'gulp deploy' -- reads from your AWS credentials file, creates the correct
// headers for your files and uploads them to S3
gulp.task('upload', () => {
  var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
  var publisher = $.awspublish.create(credentials);

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('dist/**/*', {dot: true})
    .pipe($.awspublish.gzip())
    .pipe(parallelize(publisher.publish(headers), 30))
    .pipe(publisher.cache())
    .pipe(publisher.sync())
    .pipe($.awspublish.reporter());
  });
<% } -%><% if (rsync) { -%>
// 'gulp deploy' -- reads from your Rsync credentials file and incrementally
// uploads your site to your server
gulp.task('upload', () => {
  var credentials = JSON.parse(fs.readFileSync('rsync-credentials.json', 'utf8'));

  return gulp.src('dist/**', {dot: true})
    .pipe($.rsync({
      root: 'dist',
      hostname: credentials.hostname,
      username: credentials.username,
      destination: credentials.destination,
      incremental: true
  }));
});
<% } -%><% if (ghpages) { -%>
// 'gulp deploy' -- pushes your dist folder to Github
gulp.task('upload', (done) => {
  ghPages.publish(path.join(__dirname + '/../../', 'dist'), {
    dotfiles: true,
    // branch: "master"
  },
  done);
});
<% } -%>

// 'gulp inject' -- injects your CSS and JS into either the header or the footer
gulp.task('inject', gulp.parallel('inject:head', 'inject:footer'));

// 'gulp build:site' -- copies, builds, and then copies it again
gulp.task('build:site', gulp.series('site:tmp', 'inject', 'site', 'copy:site'));

// 'gulp assets' -- cleans out your assets and rebuilds them
// 'gulp assets --prod' -- cleans out your assets and rebuilds them with
// production settings
gulp.task('assets', gulp.series(
  gulp.parallel('styles', 'scripts', 'fonts', 'images'),
  gulp.series('copy:assets')
));

// 'gulp clean' -- erases your assets and gzipped files
gulp.task('clean', gulp.parallel('clean:assets', 'clean:gzip', 'clean:dist', 'clean:site'));

// 'gulp build' -- same as 'gulp' but doesn't serve your site in your browser
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series('clean', 'assets', 'build:site', 'html'));

// 'gulp rebuild' -- WARNING: Erases your assets and built site, use only $.if
// you need to do a complete rebuild
gulp.task('rebuild', gulp.series('clean', 'clean:images'));

// 'gulp check' -- checks your site configuration for errors and lint your JS
gulp.task('check', gulp.series('site:check'));

// 'gulp deploy' -- different name for the uploading task for backwards compatability
gulp.task('deploy', gulp.series('upload'));

// 'gulp' -- cleans your assets and gzipped files, creates your assets and
// injects them into the templates, then builds your site, copied the assets
// into their directory and serves the site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series('build', 'serve'));
