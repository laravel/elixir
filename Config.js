var util = require('gulp-util');
var fs = require('fs');
var _ = require('underscore');

var config = {

    // All user requested tasks from the Gulpfile.
    tasks: [],


    // The default watchers and paths.
    watchers: {},


    // Are we in production mode?
    production: !! util.env.production,


    // The base dir for any assets.
    assetsDir: 'resources/assets/',


    // Scripts and styles to combine.
    concatenate: { css: [], js: [] },


    // Files to be copied.
    duplicate: [],


    // The default CSS output directory.
    cssOutput: 'public/css',


    // The default JS output directory.
    jsOutput: 'public/js'

};


/**
 * Designate that the given task should be watched.
 *
 * @param {string} task
 * @param {string} search
 * @param {string} group
 */
config.registerWatcher = function(task, search, group) {
    group = group || 'default';

    this.watchers[group] = this.watchers[group] || {};

    this.watchers[group][task] = search;

    return this;
}


/**
 * Build up the given src file(s), to be passed to Gulp.
 *
 * @param {string|array} src
 * @param {string}       baseDir
 * @param {string}       search
 */
config.buildGulpSrc = function(src, baseDir, search) {
    if (src) {
        return this.prefixDirToFiles(baseDir, src);
    }

    return baseDir + '/' + search;
};


/**
 * Register the given task to be triggered by Gulp.
 *
 * @param {string} task
 */
config.queueTask = function(task) {
    if (this.tasks.indexOf(task) == -1)
    {
        this.tasks.push(task);
    }

    return this;
};


/**
 * Prefix a directory path to an array of files.
 *
 * @param {string}       dir
 * @param {string|array} files
 */
config.prefixDirToFiles = function(dir, files) {
    if ( ! Array.isArray(files)) files = [files];

    return files.map(function(file) {
        return dir + '/' + file.replace(dir, '');
    });
};


/**
 * Set the default directory paths.
 *
 * @param {string} file
 */
config.setDefaultsFrom = function(file) {
    var defaults;

    if (fs.existsSync(file)) {
        defaults = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.extend(this, defaults);
    }
};


module.exports = config;