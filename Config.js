var util = require('gulp-util');

var config = {

    // All user requested tasks from the Gulpfile.
    tasks: ['routeScanning'],


    // The default watchers and paths.
    watchers: {
        default: {
            'routeScanning': 'app/**/*Controller.php'
        },
        tdd: {
            'routeScanning': 'app/**/*Controller.php'
        }
    },


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


    // The defaults for any test suites.
    testSuites: {
        phpunit: {
            src: 'tests',
            search: '/**/*Test.php'
        },

        phpspec: {
            src: 'spec',
            search: '/**/*Spec.php'
        }
    },


    // Optional file versioning.
    versioning: {
        buildDir: 'public/build',
        src: []
    },


    // Scripts and styles to combine.
    concatenate: {
        css: {},
        js: {}
    },


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


// ---- Now, for the readable config setters ---- //


config.preprocessor = function(name, src, output) {
    var preprocessor = this.preprocessors[name];
    var path = config.preprocessors.baseDir + name + '/';

    if (src) {
        preprocessor.src = prefixDirToFiles(path, src);
    } else {
        preprocessor.src = path + preprocessor.search;
    }

    if (output) preprocessor.output = output;

    this.registerWatcher(name, path + preprocessor.search);

    return queueTask(name);
};


config.sass = function(src, output) {
    return this.preprocessor('sass', src, output);
};


config.less = function(src, output) {
    return this.preprocessor('less', src, output);
};


config.coffee = function(src, output) {
    return this.preprocessor('coffee', src, output);
};


config.testSuite = function(name, src) {
    var suite = this.testSuites[name];

    if (src) suite.src = src;

    this.registerWatcher(name, suite.src + suite.search, 'tdd');

    return queueTask(name);
};


config.phpUnit = function(src) {
    return this.testSuite('phpunit', src);
};


config.phpSpec = function(src) {
    return this.testSuite('phpspec', src);
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

    concatType.src = prefixDirToFiles(baseDir || 'public', files);
    concatType.to = output;
    concatType.concatName = concatName;

    this.registerWatcher(taskName, output + '/**/*.' + type);

    queueTask(taskName);

    return this;
};


config.scripts = function(scripts, baseDir, output) {
    return this.combine('js', scripts, baseDir, output, 'scripts');
};


config.styles = function(styles, baseDir, output) {
    return this.combine('css', styles, baseDir, output, 'styles');
};


config.version = function(assets, buildDir) {
    if (buildDir) this.versioning.buildDir = buildDir;

    this.versioning.src = prefixDirToFiles('public', assets);

    this.registerWatcher('version', config.versioning.src);

    return queueTask('version');
};


config.routes = function() {
    return queueTask('routeScanning');
};


config.events = function() {
    return queueTask('eventScanning');
};


var queueTask = function(task) {
    config.tasks.push(task);

    return config;
};


var prefixDirToFiles = function(dir, files) {
    if ( ! Array.isArray(files)) files = [files];

    return files.map(function(file) {
        return dir + '/' + file.replace(dir, '');
    });
};


module.exports = config;
