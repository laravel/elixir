var gulp = require('gulp');
var copy = require('./commands/CopyFiles');
var elixir = require('laravel-elixir');
var config = elixir.config;

/*
 |----------------------------------------------------------------
 | Copying
 |----------------------------------------------------------------
 |
 | This task offers a simple way to copy files from one place to
 | another. That's it. Not any more complicated than that!
 |
 */

elixir.extend('copy', function(source, destination) {
    return copy(source, destination);
});