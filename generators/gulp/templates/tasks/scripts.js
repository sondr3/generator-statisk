'use strict';

import gulp from 'gulp';
import gzip from 'gulp-gzip';
import rename from 'gulp-rename';
import rev from 'gulp-rev';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';

import path from 'path';
import webpack from 'webpack';

const production = process.env.NODE_ENV === 'production';

export let config = {
  entry: production
    ? {
        main: './assets/javascript/main.js'
      }
    : {
        main: [
          './assets/javascript/main.js',
          'webpack/hot/dev-server',
          'webpack-hot-middleware/client'
        ]
      },
  output: {
    filename: production ? './[name]-[chunkhash].js' : './[name].js',
    path: path.resolve(__dirname, '../.tmp/assets/javascript')
  },
  context: path.resolve(__dirname, '../src'),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: production
    ? [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true
        })
      ]
    : [new webpack.HotModuleReplacementPlugin()]
};

export function scripts() {
  return new Promise(resolve =>
    webpack(config, (err, stats) => {
      if (err) console.log('Webpack', err);

      console.log(
        stats.toString({
          assets: true,
          chunks: false,
          chunkModules: false,
          colors: true,
          hash: false,
          version: false
        })
      );
      resolve();
    })
  );
}
