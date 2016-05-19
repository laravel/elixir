import fs from 'fs';
import gutil from 'gulp-util';

export default class Logger {
    /**
     * Log a heading to the console.
     *
     * @param  {string} heading
     * @return {Logger}
     */
    static heading(heading) {
        // First message call for line break.
        return Logger.message('').message(
            gutil.colors.black(gutil.colors.bgGreen(heading))
        );
    };

    /**
     * Log a general message to the console.
     *
     * @param  {string} message
     * @return {Logger}
     */
    static message(message) {
        if (Logger.shouldBeMuted()) {
            return Logger;
        }

        console.log(message);

        return Logger;
    };

    static error(message) {
        console.log(''); // line break

        console.log(
            gutil.colors.bgRed(message)
        );

        process.exit(1);
    }

    /**
     * Log a set of files to the console.
     *
     * @param  {string|Array} files
     * @param  {boolean}      checkForFiles
     * @return {Logger}
     */
    static files(files, checkForFiles) {
        files = Array.isArray(files) ? files : [files];
        var spacer = '   - ';

        if (Logger.shouldBeMuted()) {
            return Logger;
        }

        files.forEach(file => {
            if ( ! checkForFiles || assertFileExists(file)) {
                Logger.message(spacer + file);
            } else {
                Logger.message(
                    spacer + gutil.colors.bgRed(file) + ' <-- Not Found'
                );
            }
        });

        return Logger.message(''); // Line break.
    };

    /**
     * Determine if we're in test-mode.
     *
     * @return {boolean}
     */
    static shouldBeMuted() {
        return process.argv[1].indexOf('bin/_mocha') > -1;
    }

}


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
