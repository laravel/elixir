var gulp = require('gulp');
var _ = require('underscore');
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
            'resources/views/**/*.php'
        ]
    }, options);

    browserSync.init(options);

    new Elixir.Task('browserSync', function () {}).watch();
});