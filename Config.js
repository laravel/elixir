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


    // The path to bower_components.
    bowerDir: 'vendor/bower_components',


    // Files to be copied.
    duplicate: [],


    // Scripts and styles to combine.
    concatenate: { css: [], js: [] },


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