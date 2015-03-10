var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;
var utilities = require('./Utilities');
var Notification = require('./Notification');

module.exports = function(options) {

    var name = options.compiler.toLowerCase();

    var src = utilities.buildGulpSrc(
        options.src, config.assetsDir + name, options.search
    );

    var triggerSass = function(src) {
        var toMaps = plugins.if(config.sourcemaps, plugins.sourcemaps.init());

        if (options.plugin == 'gulp-ruby-sass') {
            return require('gulp-ruby-sass')(src, options.pluginOptions).pipe(toMaps);
        }

        return gulp.src(src).pipe(toMaps).pipe(
            plugins[options.plugin](options.pluginOptions)
        );
    };

    var onError = function(e) {
        new Notification().error(e, options.compiler + ' Compilation Failed!');

        this.emit('end');
    };

    gulp.task(name, function() {
        return triggerSass(src).on('error', onError)
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(config.production, plugins.minifyCss()))
            .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
            .pipe(gulp.dest(options.output || config.cssOutput))
            .pipe(new Notification().message(options.compiler + ' Compiled!'));
    });

    config.registerWatcher(
        name,
        config.assetsDir + name + '/' + options.search
    );

    return config.queueTask(name);

};
