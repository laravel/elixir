var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;

module.exports = function(options) {

    gulp.task(options.pluginName, function() {
        return gulp.src(options.src)
            .pipe(plugins[options.pluginName]('', options.pluginOptions))
            .on('error', plugins.notify.onError({
                title: 'Red!',
                message: 'Your ' + options.framework + ' tests failed!',
                icon: __dirname + '/../../icons/fail.png'
            }))
            .pipe(plugins.notify({
                title: 'Green!',
                message: 'Your ' + options.framework + ' tests passed!',
                icon: __dirname + '/../../icons/pass.png'
            }));
    });

    config.registerWatcher(options.pluginName, options.src, 'tdd');

    return config.queueTask(options.pluginName);

};
