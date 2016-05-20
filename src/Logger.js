import fs from 'fs';
import gutil from 'gulp-util';

export default class Logger {
    /**
     * Log a heading to the console.
     *
     * @param  {string} heading
     * @return {this}
     */
    heading(heading) {
        return this.break().message(
            gutil.colors.black(gutil.colors.bgGreen(heading))
        );
    };

    /**
     * Log a general message to the console.
     *
     * @param  {string} message
     * @return {this}
     */
    message(message) {
        if (this.shouldBeMuted()) {
            return this;
        }

        console.log(message);

        return this;
    };

    /**
     * Log a heading and message to the console.
     *
     * @param  {string}      heading
     * @param  {string|null} message
     * @return {this}
     */
    status(heading, message) {
        this.heading(heading);

        message && this.message(message);

        return this;
    }

    /**
     * Log an error message to the console.
     *
     * @param {string} message
     */
    error(message) {
        this.break().message(
            gutil.colors.bgRed(message)
        );

        return this;
    }

    /**
     * Log a set of files to the console.
     *
     * @param  {string}       message
     * @param  {string|Array} files
     * @param  {boolean}      checkForFiles
     * @return {this}
     */
    files(message, files, checkForFiles = true) {
        if (this.shouldBeMuted()) return this;

        this.heading(message);

        files = Array.isArray(files) ? files : [files];

        files.forEach(
            file => this.file(file, checkForFiles)
        );

        return this.break();
    };

    /**
     * Log the existence of a file to the console.
     *
     * @param  {string}  file
     * @param  {boolean} checkForFiles
     * @return {mixed}
     */
    file(file, checkForFiles) {
        var spacer = '   - ';

        if ( ! checkForFiles || assertFileExists(file)) {
            return this.message(spacer + file);
        }

        this.message(
            spacer + gutil.colors.bgRed(file) + ' <-- Not Found'
        );
    }

    /**
     * Add a line break to the console output.
     * @return {this}
     */
    break() {
        console.log(''); // line break

        return this;
    }

    /**
     * Determine if we're in test-mode.
     *
     * @return {boolean}
     */
    shouldBeMuted() {
        return process.argv[1].indexOf('bin/_mocha') > -1;
    }

}


/**
 * Assert that the given file exists.
 *
 * @param  {string} file
 * @return {boolean}
 */
function assertFileExists(file) {
    // If this file begins with a !, then the
    // user intends to exclude it from the
    // src set; we're free to ignore it.
    if (file.indexOf('!') == 0) {
        return true;
    }

    return file.match(/\*/) || fs.existsSync(file);
};
