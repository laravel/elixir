var gulp = require('gulp');
var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();
var fs = require('fs');
var merge = require('merge-stream');
var utilities = require('./Utilities');

/**
 * Delete the merged file from the previous run.
 *
 * @param  {[string]} path
 * @return {void}
 */
var deletePreviouslyMergedFile = function(path) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};


/**
 * Figure out which files should be watched, and re-merged.
 *
 * @param  {object} request
 * @return {array}
 */
var getFilesToWatch = function(request) {
    var alreadyBeingWatched = config.watchers.default[request.taskName];

    return alreadyBeingWatched ? alreadyBeingWatched.concat(request.files) : request.files;
};


/**
 * Create the Gulp task.
 *
 * @return {void}
 */
var buildTask = function(request) {
    var task = request.taskName;

    config.concatenate[request.type].push(request);

    gulp.task(request.taskName, function () {
        return merge.apply(this, config.concatenate[request.type].map(function (set) {
            return mergeFileSet(set, request);
        }));
    });

    config.registerWatcher(task, getFilesToWatch(request));
    config.queueTask(task);

    return config;
};


/**
 * Use Gulp to merge one set of files.
 *
 * @param  {object} set
 * @param  {object} request
 * @return {object}
 */
var mergeFileSet = function (set, request) {
    deletePreviouslyMergedFile(set.outputDir + '/' + set.concatFileName);

    utilities.logTask("Merging " + request.taskName, set.files);

    return gulp.src(set.files)
               .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
               .pipe(plugins.concat(set.concatFileName))
               .pipe(plugins.if(config.production, request.minifier.call(this)))
               .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
               .pipe(gulp.dest(set.outputDir));
};


module.exports = function(request) {
    return buildTask(request);
};
