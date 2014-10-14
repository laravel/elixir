var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
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

elixir.extend('coffee', function(src, output) {

    var baseDir = this.preprocessors.baseDir + 'coffee';

    src = this.buildGulpSrc(src, baseDir, '**/*.coffee');

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

        return gulp.src(src)
            .pipe(plugins.coffee().on('error', onError))
            .pipe(plugins.if(config.production, plugins.uglify()))
            .pipe(gulp.dest(output || config.jsOutput))
            .pipe(plugins.notify({
                title: 'Laravel Elixir',
                subtitle: 'CoffeeScript Compiled!',
                icon: __dirname + '/../icons/laravel.png',
                message: ' '
            }));
    });

    this.registerWatcher('coffee', baseDir + '/**/*.coffee');

    return this.queueTask('coffee');

});