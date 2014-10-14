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
        baseDir: 'resources/assets/',

        less: {
            src: '/less',
            search: '/**/*.less',
            output: 'public/css'
        },

        sass: {
            src: '/sass',
            search: '/**/*.+(sass|scss)',
            output: 'public/css'
        },

        coffee: {
            src: '/coffee',
            search: '/**/*.coffee',
            output: 'public/js'
        }
    },


    // Scripts and styles to combine.
    concatenate: { css: {}, js: {} },


    // The default CSS output directory.
    cssOutput: 'public/css',


    // The default JS output directory.
    jsOutput: 'public/js'

};


config.registerWatcher = function(task, search, group) {
    group = group || 'default';

    this.watchers[group] = this.watchers[group] || {};

    this.watchers[group][task] = search;

    return this;
}


config.addPreprocessor = function(name, src, output) {
    var preprocessor = this.preprocessors[name];
    var path = config.preprocessors.baseDir + name + '/';

    if (src) {
        preprocessor.src = this.prefixDirToFiles(path, src);
    } else {
        preprocessor.src = path + preprocessor.search;
    }

    if (output) preprocessor.output = output;

    this.registerWatcher(name, path + preprocessor.search);

    return this.queueTask(name);
};


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


config.queueTask = function(task) {
    this.tasks.push(task);

    return this;
};


config.prefixDirToFiles = function(dir, files) {
    if ( ! Array.isArray(files)) files = [files];

    return files.map(function(file) {
        return dir + '/' + file.replace(dir, '');
    });
};


module.exports = config;
