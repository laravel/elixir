var gulp = require('gulp');
var elixir = require('laravel-elixir');
var plugins = require('gulp-load-plugins')();
var utilities = require('./commands/Utilities');
var Notification = require('./commands/Notification');

var config = elixir.config;


/**
 * Build the CoffeeScript Gulp task.
 *
 * @param  {string|array} src
 * @param  {string}       output
 * @param  {array|null}   options
 */
var buildTask = function(src, output, options) {
    gulp.task('coffee', function() {
        return gulp.src(src)
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
            .pipe(plugins.coffee(options).on('error', function(e) {
                new Notification().error(e, 'CoffeeScript Compilation Failed!');

                this.emit('end');
            }))
            .pipe(plugins.concat(utilities.parse(output).name || 'app.js'))
            .pipe(plugins.if(config.production, plugins.uglify()))
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(utilities.parse(output).baseDir))
            .pipe(new Notification().message('CoffeeScript Compiled!'));
    });
};

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

    var coffeeDir = this.assetsDir + 'coffee/';

    src = utilities.buildGulpSrc(src, coffeeDir, '**/*.coffee');
    output = output || config.jsOutput;

    utilities.logTask("Running CoffeeScript", src);
    buildTask(src, output, options);

    return this.registerWatcher('coffee', coffeeDir + '/**/*.coffee')
               .queueTask('coffee');

});
