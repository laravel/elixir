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
    var task = request.taskName;

    config.concatenate[request.type].push(request);

    gulp.task(task, function() {
        var files = config.concatenate[request.type];

        return mergeFiles(files, request);
    });

    config.registerWatcher(task, getFilesToWatch(request));
    config.queueTask(task);

    return config;
};


/**
 * Use Gulp to merge one set of files.
 *
 * @param  {array}  files
 * @param  {object} request
 * @param  {int}    index
 * @return {object}
 */
var mergeFiles = function(files, request, index) {
    index = index || 0;

    var set = files[index];

    deletePreviouslyMergedFile(set.outputDir + '/' + set.concatFileName);

    return gulp.src(set.files)
               .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.init()))
               .pipe(plugins.concat(set.concatFileName))
               .pipe(plugins.if(config.production, request.minifier.call(this)))
               .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
               .pipe(gulp.dest(set.outputDir))
               .on('end', function() {
                    index++;

                    if (files[index]) {
                      mergeFiles(files, request, index);
                    }
               });
};


module.exports = function(request) {
    return buildTask(request);
};
