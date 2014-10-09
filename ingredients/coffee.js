var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Elixir').config;
var coffeeConfig = config.preprocessors.coffee;


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
            subtitle: 'Compilation Failed!',
            message:  'Error: <%= error.message %>',
            icon: __dirname + '/../icons/fail.png'
        })(err);

        this.emit('end');
    };

    return gulp.src( config.preprocessors.baseDir + coffeeConfig.src + coffeeConfig.search)
        .pipe(plugins.coffee().on('error', onError))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.preprocessors.coffee.output))
        .pipe(plugins.notify({
            title: 'CoffeeScript',
            subtitle: 'Compiled!',
            icon: __dirname + '/../icons/laravel.png',
            message: ' '
        }));
});