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

elixir.extend('scripts', function(scripts, baseDir, output) {

    gulp.task('scripts', function() {
        var scripts = config.concatenate.js;

        scripts.forEach(function(set, index) {
            var fileName = set.concatName;

            // If we're dealing with multiple script concats,
            // but the user didn't give us a filename to use
            // then we'll append the index to the filename
            // to prevent any possible collisions.
            if (scripts.length !== 1 && fileName == 'all.js') {
                fileName = fileName.replace('.js', '-' + index + '.js');
            }

            return gulp.src(set.src)
                .pipe(plugins.concat(fileName))
                .pipe(plugins.uglify())
                .pipe(gulp.dest(set.to));
        });
    });

    return this.combine('js', scripts, baseDir, output, 'scripts');

});
