var gulp         = require('gulp');
var babel        = require('gulp-babel');
var utilities    = require('./Utilities');
var merge        = require('merge-stream');
var Notification = require('./Notification');
var plugins      = require('gulp-load-plugins')();
var config       = require('laravel-elixir').config;


/**
 * Create the Gulp task.
 *
 * @param {string} task
 */
var buildTask = function(task) {
    gulp.task(task, function() {
        var collection = config.collections['concatenate'+task];

        return merge.apply(this, collection.map(mergeFiles));
    });
};


/**
 * Use Gulp to handle a request to merge files.
 *
 * @param {object} request
 */
var mergeFiles = function (request) {
    logTask(request.files);

    var shouldCompile = function() {
        return request.taskName === 'scripts' && request.hasOwnProperty('babel');
    };

    return gulp
        .src(request.files)
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
        .pipe(plugins.concat(request.concatFileName))
        .pipe(plugins.if(shouldCompile(), babel(request.babel)))
            .on('error', function(e) {
                new Notification().error(
                    e, 'Babel Compilation Failed!'
                );

                this.emit('end');
            })
        .pipe(plugins.if(config.production, request.minifier.call(this)))
        .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(request.outputDir));
};


/**
 * Log the task to the console.
 *
 * @param {string|array} files
 */
var logTask = function(files) {
    var message = "Merging" + (config.production ? " and Minifying" : '');

    utilities.logTask(message, files);
};


/**
 * Figure out which files should be watched, and re-merged.
 *
 * @param {object} request
 */
var getFilesToWatch = function(request) {
    var alreadyWatched = config.watchers.default[request.taskName];

    return alreadyWatched ? alreadyWatched.concat(request.files) : request.files;
};


module.exports = function(request) {
    var task = request.taskName;

    config.saveTask('concatenate' + task, request);

    buildTask(task);

    return config.registerWatcher(task, getFilesToWatch(request))
                 .queueTask(task);
};
