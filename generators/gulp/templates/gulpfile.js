// generated on <%= date %> using <%= name %> <%= version %>
'use strict';

const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');<% if (babel) { %>
const babel = require('gulp-babel');<% } %>
const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

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
    .pipe($.if(!argv.prod, sourcemaps.init()))<% if (babel) { %>
    .pipe($.babel({
      presets: ['es2015']
    }))<% } %>
    .pipe($.concat('index.js'))
    .pipe($.size({
      showFiles: true
    }))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.if('*.js', uglify({preserveComments: 'some'}))))
    .pipe($.if(argv.prod, $.size({
      showFiles: true
    })))
    .pipe($.if(argv.prod, $rev()))
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
    .pipe($.if(!argv.prod, sourcemaps.init()))
    .pipe($.sass({
      precision: 10
    }).on('error', sass.logError))
    .pipe($.postcss([
      autoprefixer({browsers: 'last 1 version'})
    ]))
    .pipe($.size({
      showFiles: true
    }))
    .pipe($.if(argv.prod, $.rename({suffix: '.min'})))
    .pipe($.if(argv.prod, $.if('*.css', $.cssnano({autoprefixer: false}))))
    .pipe($.if(argv.prod, size({
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
    .pipe($.if(!argv.prod, $.browserSync.stream()))
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
    .pipe(size({title: 'fonts'}))
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

<% if (!noUpload) { -%>
// You can also just use 'gulp upload' but this way you can see all the main
// tasks in the gulpfile instead of having to hunt for the deploy tasks
gulp.task('deploy', gulp.series('upload'));

<% } -%>
// 'gulp rebuild' -- WARNING: Erases your assets and built site, use only $.if
// you need to do a complete rebuild
gulp.task('rebuild', gulp.series('clean', 'clean:images'));

// 'gulp check' -- checks your site configuration for errors and lint your JS
gulp.task('check', gulp.series('site:check'));

// 'gulp' -- cleans your assets and gzipped files, creates your assets and
// injects them into the templates, then builds your site, copied the assets
// into their directory and serves the site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series('build', 'serve'));
