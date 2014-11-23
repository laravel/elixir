var gulp = require('gulp');
var publish = require('./helpers/CopyFiles');
var elixir = require('laravel-elixir');
var config = elixir.config;

/*
 |----------------------------------------------------------------
 | Bower Publishing
 |----------------------------------------------------------------
 |
 | This task allows you to copy any files from the bower_components
 | directory to the appropriate locations in your application.
 |
 */

elixir.extend('publish', function(source, destination) {
    source = config.bowerDir + '/' + source.replace(config.bowerDir, '');

    return publish(source, destination);
});

elixir.extend('copy', function(source, destination) {
    return publish(source, destination);
});