var gulp = require('gulp');
var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();
var fs = require('fs');

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
    config.concatenate[request.type].push(request);

    config.registerWatcher(request.taskName, getFilesToWatch(request));
    config.queueTask(request.taskName);

    gulp.task(request.taskName, function() {
        var assets = config.concatenate[request.type];
        var stream;

        assets.forEach(function(set, index) {
            stream = mergeFileSet(set, index, assets, request);
        });

        return stream;
    });

    return config;
};


/**
 * Use Gulp to merge one set of files.
 *
 * @param  {object}  set
 * @param  {index}   index
 * @param  {assets}  assets
 * @param  {request} request
 * @return {object}
 */
var mergeFileSet = function(set, index, assets, request) {
    deletePreviouslyMergedFile(set.outputDir + '/' + set.concatFileName);

    return gulp.src(set.files)
               .pipe(plugins.concat(set.concatFileName))
               .pipe(plugins.if(config.production, request.minifier.call(this)))
               .pipe(gulp.dest(set.outputDir));
};


module.exports = function(request) {
    return buildTask(request);
};
