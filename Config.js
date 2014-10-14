var util = require('gulp-util');

var config = {

    // All user requested tasks from the Gulpfile.
    tasks: [],


    // The default watchers and paths.
    watchers: {},


    // Are we in production mode?
    production: !! util.env.production,


    // The defaults for any preprocessors.
    preprocessors: {
        baseDir: 'resources/assets/'
    },


    // Scripts and styles to combine.
    concatenate: { css: {}, js: {} },


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

    return baseDir + search;
};


/**
 * Handle the preparation for combining any assets.
 *
 * @param {string} type
 * @param {array}  files
 * @param {string} baseDir
 * @param {string} output
 * @param {string} taskName
 */
config.combine = function(type, files, baseDir, output, taskName) {
    var concatType = this.concatenate[type];
    var concatName = 'all.min.' + type;
    var output = output || this[type + 'Output'];

    if (output.indexOf('.' + type) > -1) {
        var pathFragments = output.split('/');

        concatName = pathFragments.pop();
        output = pathFragments.join('/');
    }

    concatType.src = this.prefixDirToFiles(baseDir || 'public', files);
    concatType.to = output;
    concatType.concatName = concatName;

    this.registerWatcher(taskName, output + '/**/*.' + type);

    this.queueTask(taskName);

    return this;
};


/**
 * Register the given task to be triggered by Gulp.
 *
 * @param {string} task
 */
config.queueTask = function(task) {
    this.tasks.push(task);

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


module.exports = config;
