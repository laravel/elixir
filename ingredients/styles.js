var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | CSS File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your style sheet files
 | in order, which provides a quick and simple way to reduce
 | the number of HTTP requests your application fires off.
 |
 */

elixir.extend('styles', function(styles, baseDir, output) {

    gulp.task('styles', function() {
        var styles = config.concatenate.css;

        styles.forEach(function(set, index) {
            var fileName = set.concatName;

            // If we're dealing with multiple style concats,
            // but the user didn't give us a filename to use
            // then we'll append the index to the filename
            // to prevent any possible collisions.
            if (styles.length !== 1 && fileName == 'all.css') {
                fileName = fileName.replace('.css', '-' + index + '.css');
            }

            return gulp.src(set.src)
                .pipe(plugins.concat(fileName))
                .pipe(plugins.minifyCss())
                .pipe(gulp.dest(set.to));
        });
    });

    return this.combine('css', styles, baseDir, output, 'styles');

});
