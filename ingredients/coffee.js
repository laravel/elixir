var gulp = require('gulp');
var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | CoffeeScript Compilation
 |----------------------------------------------------------------
 |
 | This task will compile your CoffeeScript, minify it, and then
 | optionally generate a "manifest" file that helps with your
 | browser cache-busting of previous versions of your code.
 |
 */

gulp.task('coffee', function() {
    var onError = function(err) {
        plugins.notify.onError({
            title:    'Laravel Elixir',
            subtitle: 'CoffeeScript Compilation Failed!',
            message:  'Error: <%= error.message %>',
            icon: __dirname + '/../icons/fail.png'
        })(err);

        this.emit('end');
    };

    return gulp.src(config.preprocessors.coffee.src)
        .pipe(plugins.coffee().on('error', onError))
        .pipe(plugins.if(config.production, plugins.uglify()))
        .pipe(gulp.dest(config.preprocessors.coffee.output))
        .pipe(plugins.notify({
            title: 'Laravel Elixir',
            subtitle: 'CoffeeScript Compiled!',
            icon: __dirname + '/../icons/laravel.png',
            message: ' '
        }));
});
