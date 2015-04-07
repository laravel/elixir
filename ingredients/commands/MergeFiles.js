var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();
var utilities = require('./Utilities');
var merge = require('merge-stream');
var gulp = require('gulp');
var fs = require('fs');


/**
 * Delete the merged file from the previous run.
 *
 * @param  {string} path
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
    var alreadyWatched = config.watchers.default[request.taskName];

    return alreadyWatched ? alreadyWatched.concat(request.files) : request.files;
};


/**
 * Create the Gulp task.
 *
 * @return {void}
 */
var buildTask = function(request) {
    var task = request.taskName;
    var toConcat = config.concatenate[request.type];

    // So that we may call the styles and scripts methods as
    // often as we want, we need to store every request.
    toConcat.push(request);

    gulp.task(task, function () {
        // And then we'll simply loop over that stored list, and
        // for each one, trigger Gulp. To keep from crossing
        // the streams, we'll use the merge-stream plugin.
        return merge.apply(this, toConcat.map(function (set) {
            return mergeFileSet(set, request);
        }));
    });

    return config
      .registerWatcher(task, getFilesToWatch(request))
      .queueTask(task);
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

    utilities.logTask("Merging", set.files);

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
