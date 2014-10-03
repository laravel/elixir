var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Straw').config;

/*
 |--------------------------------------------------------------------------
 | CoffeeScript Compilation
 |--------------------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then optionally
 | generate a manifest file, to help with automatic cache-busting.
 |
 */
gulp.task('coffee', function() {
    var onError = function(err) {
        plugins.notify.onError({
            title:    'CoffeeScript',
            subtitle: 'Compilation Failed',
            message:  'Error: <%= error.message %>'
        })(err);

        this.emit('end');
    };

    return gulp.src(config.jsPreprocessorSource + '/**/*.coffee')
        .pipe(plugins.coffee().on('error', onError))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.jsOutput))
        .pipe(plugins.notify({
            title: 'CoffeeScript',
            subtitle: 'Compiled!'
        }));
});