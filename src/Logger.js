import fs from 'fs';
import gutil from 'gulp-util';

const Logger = function() {};

/**
 * Log a heading to the console.
 *
 * @param  {string} heading
 * @return {Logger}
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
 * @param  {string} message
 * @return {Logger}
 */
Logger.message = function(message) {
    console.log(message);

    return Logger;
};

/**
 * Log a set of files to the console.
 *
 * @param  {string|Array} files
 * @param  {boolean}      checkForFiles
 * @return {Logger}
 */
Logger.files = function(files, checkForFiles) {
    files = Array.isArray(files) ? files : [files];
    var spacer = '   - ';

    files.forEach(file => {
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
 * @param  {string} file
 * @return {boolean}
 */
let assertFileExists = function(file) {
    // If this file begins with a !, then the
    // user intends to exclude it from the
    // src set; we're free to ignore it.
    if (file.indexOf('!') == 0) {
        return true;
    }

    return file.match(/\*/) || fs.existsSync(file);
};

export default Logger;