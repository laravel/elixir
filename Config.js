var util = require('gulp-util');
var fs = require('fs');
var _ = require('underscore');

var config = {
    production:   !! util.env.production,
    srcDir:       'app',
    publicDir:    'public',
    assetsDir:    'resources/assets/',
    cssOutput:    'public/css',
    jsOutput:     'public/js',
    sourcemaps:   ! util.env.production,
    autoprefix:   true,
    tasks:        [],
    collections:  [],
    watchers:     { default: {} },
    babelOptions: {
        stage: 2,
        compact: false
    },
    autoprefixerOptions: {
        browsers: ['last 2 versions'],
        cascade: false
    }
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
};


/**
 * Register the given task to be triggered by Gulp.
 *
 * @param {string} task
 */
config.queueTask = function(task) {
    if (! _.contains(this.tasks, task)) {
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


/**
 * Store a set of data in a collection.
 *
 * @param {string} key
 * @param {object} data
 */
config.saveTask = function(key, data) {
    this.collections[key] = this.collections[key] || [];

    this.collections[key].push(data);
}


module.exports = config;
