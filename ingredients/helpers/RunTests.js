var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;
var Notification = require('./Notification');

module.exports = function(options) {

    var onError = function(e) {
        new Notification().forFailedTests(e, options.framework);

        this.emit('end');
    };

    gulp.task(options.pluginName, function() {
        return gulp.src(options.src)
            .pipe(plugins[options.pluginName]('', options.pluginOptions))
            .on('error', onError)
            .pipe(new Notification().forPassedTests(options.framework));
    });

    config.registerWatcher(options.pluginName, options.src, 'tdd');

    return config.queueTask(options.pluginName);

};
