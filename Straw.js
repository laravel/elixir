var _ = require('underscore');


/*
 |--------------------------------------------------------------------------
 | Straw
 |--------------------------------------------------------------------------
 |
 | Straw is a fun and clean entry point for Gulp usage. Use a fluent
 | API to specify your needs, and be done with it!
 |
 */
var Straw = function() {
    this.sip = function(callback) {
        callback(Straw.config);

        // We want a clean Gulpfile.
        require('require-dir')('./tasks');
    };
};


/*
 |--------------------------------------------------------------------------
 | Queuing Tasks
 |--------------------------------------------------------------------------
 |
 | We need a place to queue all user registered tasks. For each method
 | call from Straw.sip(), we'll update this array so that we know
 | which tasks need to be triggered, when running 'gulp'.
 |
 */
Straw.tasks = [];

var queueTask = function(task) {
    Straw.tasks.push(task);
};


/*
 |--------------------------------------------------------------------------
 | Configuration
 |--------------------------------------------------------------------------
 |
 |  This object houses our master configuration, while also providing a
 |  number of readable methods to update the respective values.
 |
 */
Straw.config = {

    // What are the default for any preprocessors?
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

    // What are the defaults for any test suites?
    testSuites: {
        phpunit: {
            src: 'tests'
        },
        phpspec: {
            src: 'spec'
        }
    },

    // Where should compiled CSS be saved?
    cssOutput: 'public/css',

    // Where should compiled JS be saved?
    jsOutput: 'public/js',

    // Any CSS files to hash?
    hashesStyles: '',

    // Any JS files to hash?
    hashesScripts: '',

    // Should we concatenate any JS or CSS files?
    concatenate: {
        css: { source: '', to: ''},
        js: { source: '', to: '' }
    }
};

var config = Straw.config;

config.preprocessor = function(name, src, output) {
    var preprocessor = this.preprocessors[name];

    if (src) preprocessor.src = src;
    if (output) preprocessor.output = output;

    queueTask(name);

    return this;
},

config.useSass = function(src, output) {
    return this.preprocessor('sass', src, output);
},

config.useLess = function(src, output) {
    return this.preprocessor('less', src, output);
},

config.useCoffee = function(src, output) {
    return this.preprocessor('coffee', src, output);
},

config.testSuite = function(name, src) {
    if (src) this.testSuites[name].src = src;

    queueTask(name);

    return this;
},

config.runPHPUnit = function(src) {
    return this.testSuite('phpunit', src);
},

config.runPHPSpec = function(src) {
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

config.combineScripts = function(scripts, baseDir, output) {
    queueTask('combineScripts');

    return this.combine('js', scripts, baseDir, output);
},

config.combineStyles = function(styles, baseDir, output) {
    queueTask('combineStyles');

    return this.combine('css', styles, baseDir, output);
},

config.hash = function(type, assets) {
    var property = 'hashes' + type.charAt(0).toUpperCase() + type.substring(1);

    this[property] = assets;

    queueTask('hash');

   return this;
}

config.hashStyles = function(assets) {
    return this.hash('styles', assets);
}

config.hashScripts = function(assets) {
    return this.hash('scripts', assets);
}

module.exports = Straw;