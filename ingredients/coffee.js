var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var plugins = require('gulp-load-plugins')();
var utilities = require('./commands/Utilities');
var Notification = require('./commands/Notification');

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

elixir.extend('coffee', function(src, output, options) {

    var assetsDir = this.assetsDir + 'coffee/';

    var onError = function(e) {
        new Notification().error(e, 'CoffeeScript Compilation Failed!');

        this.emit('end');
    };

    src = utilities.buildGulpSrc(src, assetsDir, '**/*.coffee');

    gulp.task('coffee', function() {
        return gulp.src(src)
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
            .pipe(plugins.coffee(options).on('error', onError))
            .pipe(plugins.if(config.production, plugins.uglify()))
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(output || config.jsOutput))
            .pipe(new Notification().message('CoffeeScript Compiled!'));
    });

    this.registerWatcher('coffee', assetsDir + '/**/*.coffee');

    return this.queueTask('coffee');

});
