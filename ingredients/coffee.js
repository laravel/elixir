var gulp         = require('gulp');
var elixir       = require('laravel-elixir');
var config       = elixir.config;
var merge        = require('merge-stream');
var plugins      = require('gulp-load-plugins')();
var utilities    = require('./commands/Utilities');
var Notification = require('./commands/Notification');


/**
 * Build the CoffeeScript Gulp task.
 */
var buildTask = function() {
    gulp.task('coffee', function() {
        var dataSet = elixir.config.collections.coffee;

        return merge.apply(this, dataSet.map(function(data) {
            utilities.logTask("Running CoffeeScript", data.src);

            return gulp.src(data.src)
                .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
                .pipe(plugins.coffee(data.options).on('error', function(e) {
                    new Notification().error(e, 'CoffeeScript Compilation Failed!');

                    this.emit('end');
                }))
                .pipe(plugins.concat(data.output.name || 'app.js'))
                .pipe(plugins.if(config.production, plugins.uglify()))
                .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
                .pipe(gulp.dest(data.output.baseDir));
        }))
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

    elixir.config.saveTask('coffee', {
        src: utilities.buildGulpSrc(src, coffeeDir, '**/*.coffee'),
        output: utilities.parse(output || config.jsOutput),
        options: options || {}
    });

    buildTask();

    return this.registerWatcher('coffee', coffeeDir + '/**/*.coffee')
               .queueTask('coffee');
});
