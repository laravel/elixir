var gulp         = require('gulp');
var Notification = require('./Notification');
var plugins      = require('gulp-load-plugins')();
var config       = require('laravel-elixir').config;


/**
 * Build the Gulp task.
 *
 * @param {object} options
 */
module.exports = function(options) {
    var name = options.pluginName;
    var notify = new Notification();

    gulp.task(name, function() {
        return gulp
            .src(options.src)
            .pipe(plugins[name]('', options.pluginOptions))
            .on('error', function(e) {
                notify.forFailedTests(e, options.framework);
                this.emit('end');
            })
            .pipe(notify.forPassedTests(options.framework));
    });

    return config
        .registerWatcher(name, options.src, 'tdd')
        .queueTask(name);
};

