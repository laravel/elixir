var gutil = require('gulp-util');
var fs = require('fs');

/**
 * Build up the given src file(s), to be passed to Gulp.
 *
 * @param {string|array} src
 * @param {string}       baseDir
 * @param {string}       search
 */
var buildGulpSrc = function(src, baseDir, search) {
    if (src) {
        return prefixDirToFiles(baseDir, src);
    }

    return baseDir + '/' + search;
};


/**
 * Prefix a directory path to an array of files.
 *
 * @param {string}       dir
 * @param {string|array} files
 */
var prefixDirToFiles = function(dir, files) {
    if ( ! Array.isArray(files)) files = [files];

    return files.map(function(file) {
        return dir + '/' + file.replace(dir, '');
    });
};




/**
 * Log an action to the console for user feedback.
 *
 * @param {string} heading
 * @param {mixed}  files
 */
var logTask = function(message, files) {
    gutil.log(gutil.colors.black(message + ': ', files.join(', ')));

    assertFilesExist(files);
};


/**
 * Log a missing file event to the console.
 *
 * @param {array} files
 */
var logMissingFile = function(file) {
    return gutil.log(gutil.colors.bgRed('File not found: ' + file));
};


/**
 * Assert that all files in an array exist.
 *
 * @param {array} files
 */
var assertFilesExist = function(files) {
    files.forEach(function(file) {
        fs.exists(file, function(exists) {
            if ( ! exists) {
                logMissingFile(file);
            }
        });
    });
};

module.exports = {
    buildGulpSrc: buildGulpSrc,
    prefixDirToFiles: prefixDirToFiles,
    logTask: logTask
};
