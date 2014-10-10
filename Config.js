var config = {

    // All user requested tasks from the Gulpfile.
    tasks: [],

    // The default watchers and paths.
    watchers: {
        default: function() {
            return {
                sass: config.preprocessors.baseDir + '/**/*.+(sass|scss)',
                less: config.preprocessors.baseDir + '/**/*.less',
                coffee: config.preprocessors.baseDir + '/**/*.coffee',
                routeScanning: 'app/**/*Controller.php',
                eventScanning: 'app/**/*.php',
                version: config.versioning.src
            }
        },

        tdd: function() {
            return {
                routeScanning: 'app/**/*Controller.php',
                phpunit: config.testSuites.phpunit.src + config.testSuites.phpunit.search,
                phpspec: config.testSuites.phpspec.src + config.testSuites.phpspec.search
            }
        }
    },

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

config.preprocessor = function(name, src, output, fileExt) {
    var preprocessor = this.preprocessors[name];

    if (src && ! Array.isArray(src)) {
        // The full path to the src file is optional.
        preprocessor.src = name + '/' +
            src.replace(this.preprocessors.baseDir + name, '')
               .replace(name + '/', '');

        // For direct files, we should remove the search path.
        if (src.match(new RegExp(fileExt || '\\.' + name))) {
            this.preprocessors[name].search = '';
        }
    }

    if (output) preprocessor.output = output;

    return queueTask(name);
},

config.sass = function(src, output) {
    return this.preprocessor('sass', src, output, '\\.s[ac]ss');
},

config.less = function(src, output) {
    return this.preprocessor('less', src, output);
},

config.coffee = function(src, output) {
    return this.preprocessor('coffee', src, output);
},

config.testSuite = function(name, src) {
    if (src) this.testSuites[name].src = src;

    return queueTask(name);
},

config.phpUnit = function(src) {
    return this.testSuite('phpunit', src);
},

config.phpSpec = function(src) {
    return this.testSuite('phpspec', src);
},

config.combine = function(type, files, baseDir, output) {
    this.concatenate[type].source = prefixDirToFiles(baseDir || 'public', files);
    this.concatenate[type].to = output;

    return this;
},

config.scripts = function(scripts, baseDir, output) {
    queueTask('scripts');

    return this.combine('js', scripts, baseDir, output);
},

config.styles = function(styles, baseDir, output) {
    queueTask('styles');

    return this.combine('css', styles, baseDir, output);
},

config.version = function(assets, buildDir) {
    if (buildDir) this.versioning.buildDir = buildDir;

    this.versioning.src = prefixDirToFiles('public', assets);

    return queueTask('version');
},

config.routes = function() {
    return queueTask('routeScanning');
}

config.events = function() {
    return queueTask('eventScanning');
}

var queueTask = function(task) {
    config.tasks.push(task);

    return config;
};

var prefixDirToFiles = function(dir, files) {
    dir = (dir || '.') + '/';

    if ( ! Array.isArray(files)) files = [files];

    return files.map(function(file) {
        return dir + file.replace(dir, '');
    });
}

module.exports = config;
