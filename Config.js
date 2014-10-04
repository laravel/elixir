var config = {

    // The tasks to trigger when calling 'gulp'.
    tasks: [],

    // The defaults for any preprocessors.
    preprocessors: {
        less: {
            src: 'resources/assets/less',
            output: 'public/css'
        },
        sass: {
            src: 'resources/assets/sass',
            output: 'public/css'
        },
        coffee: {
            src: 'resources/assets/coffee',
            output: 'public/js'
        }
    },

    // The defaults for any test suites.
    testSuites: {
        phpunit: { src: 'tests' },
        phpspec: { src: 'spec' }
    },

    // Optional file versioning.
    versions: {
        styles: {},
        scripts: {}
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

config.preprocessor = function(name, src, output) {
    var preprocessor = this.preprocessors[name];

    if (src) preprocessor.src = src;
    if (output) preprocessor.output = output;

    queueTask(name);

    return this;
},

config.sass = function(src, output) {
    return this.preprocessor('sass', src, output);
},

config.less = function(src, output) {
    return this.preprocessor('less', src, output);
},

config.coffee = function(src, output) {
    return this.preprocessor('coffee', src, output);
},

config.testSuite = function(name, src) {
    if (src) this.testSuites[name].src = src;

    queueTask(name);

    return this;
},

config.phpUnit = function(src) {
    return this.testSuite('phpunit', src);
},

config.phpSpec = function(src) {
    return this.testSuite('phpspec', src);
},

config.combine = function(type, files, baseDir, output) {
    var ext = '.' + type;
    baseDir = baseDir || '.';

    files = files.map(function(file) {
        return baseDir + '/' + file.replace(ext, '') + ext;
    });

    this.concatenate[type].source = files;
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

config.version = function(type, assets) {
    this.versions[type].src = assets;

    queueTask('version' + type.charAt(0).toUpperCase() + type.substring(1));

    return this;
},

config.versionStyles = function(assets) {
    return this.version('styles', assets);
}

config.versionScripts = function(assets) {
    return this.version('scripts', assets);
}

var queueTask = function(task) {
    config.tasks.push(task);
};

config.routes = function() {
    queueTask('routeScanning');

    return this;
}

module.exports = config;