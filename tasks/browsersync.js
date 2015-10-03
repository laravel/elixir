var gulp = require('gulp');
var _ = require('underscore');
var browserSync = require('browser-sync').create();
var Elixir = require('laravel-elixir');

var config = Elixir.config;

/*
 |----------------------------------------------------------------
 | BrowserSync
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy files from one place to
 | another. No more complicated than that! You may either set
 | a single file or alternatively you can copy a full dir.
 |
 */

Elixir.extend('browserSync', function (options) {

  options = _.extend(config.browserSync, {
    files: [
      config.appPath + '/**/*.php',
      config.publicPath + '/' + config.css.outputFolder + '/**/*.css',
      config.publicPath + '/' + config.js.outputFolder + '/**/*.js',
      'resources/views/**/*.php'
    ]
  }, options);

  browserSync.init(options);

  // Empty task since we've already initialized Browsersync
  new Elixir.Task('browserSync', function () {}).watch();

});