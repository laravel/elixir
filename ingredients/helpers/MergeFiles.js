var gulp = require('gulp');
var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();
var utilities = require('./Utilities');
var fs = require('fs');

/**
 * Construct the merged file name.
 *
 * @param  {array}  assets
 * @param  {string} fileName
 * @param  {ext}    ext
 * @param  {index}  index
 * @return {string}
 */
var constructFileName = function(assets, fileName, ext, index) {
    var ext = '.' + ext;

    if (multiConcatsWithoutOutputPaths(assets, fileName, ext)) {
        return fileName.replace(ext, '-' + (++index + ext));
    }

    return fileName;
}

/**
 * Determine if we need to concat multiple sets,
 * but the user didn't specify output filenames.
 *
 * @param  {string}  assets
 * @param  {string}  fileName
 * @param  {string}  extension
 * @return {boolean}
 */
var multiConcatsWithoutOutputPaths = function(assets, fileName, extension) {
    return assets.length !== 1 && fileName == 'all' + extension
};


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
 * Queue up a request for file concatenations.
 *
 * @param  {object} options
 * @return {void}
 */
var queueAssetMerging = function(options) {
    var baseDir = options.baseDir || 'public';
    var type = options.type;
    var concatFileName = 'all.' + type;
    var outputDir = options.outputDir || config[type + 'Output'];
    var files = options.files || '**/*.' + type;

    // If the user set the outputDir to a file name, rather than
    // a directory, we'll need to compensate for that.
    if (outputDir.indexOf('.' + type) > -1) {
        var pathSegments = options.outputDir.split('/');

        concatFileName = pathSegments.pop();
        outputDir = pathSegments.join('/');
    }

    config.concatenate[type].push({
        src: utilities.prefixDirToFiles(baseDir, files),
        to: outputDir,
        concatFileName: concatFileName
    });

    // We only need to queue and register a watcher once.
    if (config.tasks.indexOf(options.taskName) == -1) {
        config.registerWatcher(options.taskName, baseDir + '/**/*.' + type);

        config.queueTask(options.taskName);
    }
};


/**
 * Create the Gulp task.
 *
 * @return {void}
 */
var buildTask = function(options) {
    gulp.task(options.taskName, function() {
        var assets = config.concatenate[options.extension];
        var stream;

        assets.forEach(function(set, index) {
            stream = mergeFileSet(set, index, assets, options);
        });

        return stream;
    });
};


/**
 * Use Gulp to merge one set of files.
 *
 * @param  {object}  set
 * @param  {index}   index
 * @param  {assets}  assets
 * @param  {options} options
 * @return {object}
 */
var mergeFileSet = function(set, index, assets, options) {
    fileName = constructFileName(assets, set.concatFileName, options.extension, index);

    deletePreviouslyMergedFile(set.to + '/' + fileName);

    return gulp.src(set.src)
               .pipe(plugins.concat(fileName))
               .pipe(plugins.if(config.production, options.minifier.call(this)))
               .pipe(gulp.dest(set.to));
};


module.exports = function(options) {

    queueAssetMerging({
        type: options.extension,
        files: options.assets,
        baseDir: options.baseDir,
        outputDir: options.output,
        taskName: options.taskName
    });

    buildTask(options);

    return config;

};
