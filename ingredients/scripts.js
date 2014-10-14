var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var plugins = require('gulp-load-plugins')();

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

elixir.extend('styles', function(scripts, baseDir, output) {

    gulp.task('scripts', function() {
        return gulp.src(config.concatenate.js.src)
            .pipe(plugins.concat(config.concatenate.js.concatName))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(config.concatenate.js.to));
    });

    return this.combine('js', scripts, baseDir, output, 'scripts');

});