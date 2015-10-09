var gulp = require('gulp');
var _ = require('underscore');
var gutils = require('gulp-util');
var Elixir = require('laravel-elixir');
var browserSync = require('browser-sync').create();

var config = Elixir.config;

/*
 |----------------------------------------------------------------
 | BrowserSync
 |----------------------------------------------------------------
 |
 | Browsersync makes your browser testing workflow faster by
 | synchronizing URLs, behavior, and code changes across
 | across multiple devices. And, now it's in Elixir!
 |
 */

Elixir.extend('browserSync', function (options) {
    options = _.extend(config.browserSync, {
        files: [
            config.appPath + '/**/*.php',
            config.get('public.css.outputFolder') + '/**/*.css',
            config.get('public.js.outputFolder') + '/**/*.js',
            config.get('public.versioning.buildFolder') + '/rev-manifest.json',
            'resources/views/**/*.php'
        ],
        watchOptions: {
            usePolling: true
        }
    }, options);

    // Browsersync will only run during `gulp watch`.
    if (gutils.env._.indexOf('watch') > -1) {
        browserSync.init(options);
    }

    new Elixir.Task('browserSync', function () {}).watch();
});