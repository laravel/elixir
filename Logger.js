var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');


/**
 * Create a new Logger constructor.
 */
var Logger = function() {};


/**
 * Log a heading to the console.
 *
 * @param {string} heading
 */
Logger.heading = function(heading) {
    console.log(''); // line break

    console.log(
        gutil.colors.black(gutil.colors.bgGreen(heading))
    );

    return Logger;
};


/**
 * Log a general message to the console.
 *
 * @param {string} message
 */
Logger.message = function(message) {
    console.log(message);

    return Logger;
};


/**
 * Log a set of files to the console.
 *
 * @param {string|array} files
 * @param {boolean}      checkForFiles
 */
Logger.files = function(files, checkForFiles) {
    files = Array.isArray(files) ? files : [files];
    var spacer = '   - ';

    files.forEach(function(file) {
        if ( ! checkForFiles || assertFileExists(file)) {
            console.log(spacer + file);
        } else {
            console.log(spacer + gutil.colors.bgRed(file) + ' <-- Not Found');
        }
    });

    console.log(); // For a line break.

    return Logger;
};


/**
 * Assert that the given file exists.
 *
 * @param {string} file
 */
var assertFileExists = function(file) {
    return file.match(/\*/) || fs.existsSync(file);
};


module.exports = Logger;
