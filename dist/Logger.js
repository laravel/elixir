'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new Logger constructor.
 */
var Logger = function Logger() {};

/**
 * Log a heading to the console.
 *
 * @param  {string} heading
 * @return {Logger}
 */
Logger.heading = function (heading) {
    console.log(''); // line break

    console.log(_gulpUtil2.default.colors.black(_gulpUtil2.default.colors.bgGreen(heading)));

    return Logger;
};

/**
 * Log a general message to the console.
 *
 * @param  {string} message
 * @return {Logger}
 */
Logger.message = function (message) {
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
Logger.files = function (files, checkForFiles) {
    files = Array.isArray(files) ? files : [files];
    var spacer = '   - ';

    files.forEach(function (file) {
        if (!checkForFiles || assertFileExists(file)) {
            console.log(spacer + file);
        } else {
            console.log(spacer + _gulpUtil2.default.colors.bgRed(file) + ' <-- Not Found');
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
var assertFileExists = function assertFileExists(file) {
    // If this file begins with a !, then the
    // user intends to exclude it from the
    // src set; we're free to ignore it.
    if (file.indexOf('!') == 0) {
        return true;
    }

    return file.match(/\*/) || _fs2.default.existsSync(file);
};

exports.default = Logger;