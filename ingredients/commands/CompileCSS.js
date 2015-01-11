var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;
var utilities = require('./Utilities');
var Notification = require('./Notification');

module.exports = function(options) {

    var src = utilities.buildGulpSrc(
        options.src, config.assetsDir + options.pluginName, options.search
    );

    var onError = function(e) {
        new Notification().error(e, options.compiler + ' Compilation Failed!');

        this.emit('end');
    };

    gulp.task(options.pluginName, function() {
        return gulp.src(src)
            .pipe(plugins[options.pluginName](options.pluginOptions)).on('error', onError)
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(config.production, plugins.minifyCss()))
            .pipe(gulp.dest(options.output || config.cssOutput))
            .pipe(new Notification().message(options.compiler + ' Compiled!'));
    });

    config.registerWatcher(
        options.pluginName,
        config.assetsDir + options.pluginName + '/' + options.search
    );

    return config.queueTask(options.pluginName);

};
