var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var jsMinifier = require('gulp-uglify');
var gulpCombiner = require('./helpers/GulpCombiner.js')

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

elixir.extend('scripts', function(scripts, baseDir, output) {

    gulp.task('scripts', function() {
        gulpCombiner({
            assets: config.concatenate.js,
            minifier: jsMinifier,
            extension: 'js'
        })
    });

    return this.combine('js', scripts, baseDir, output, 'scripts');

});
