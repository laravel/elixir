/*
 |--------------------------------------------------------------------------
 | The Entry Point
 |--------------------------------------------------------------------------
 |
 | Elixir will be the entry point from the Gulpfile. When called, we'll
 | immediately trigger the user's Gulp config settings.
 |
 */
var Elixir = function(recipe) {
    require('require-dir')('./ingredients');

    return Elixir.brew(recipe);
};

Elixir.brew = function(recipe) {
    return recipe(Elixir.config);
}


/*
 |--------------------------------------------------------------------------
 | Queuing Tasks
 |--------------------------------------------------------------------------
 |
 | We need a place to queue all user registered tasks. For each request
 | from the Gulpfile, we'll update this array so that we know which
 | tasks need to be triggered when running 'gulp'.
 |
 */
Elixir.tasks = [];

var queueTask = function(task) {
    Elixir.tasks.push(task);
};


/*
 |--------------------------------------------------------------------------
 | Configuration
 |--------------------------------------------------------------------------
 |
 | This object houses our master configuration, while also providing a
 | number of readable methods to update the respective values.
 |
 */
Elixir.config = {

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
        phpunit: { src: 'tests' },
        phpspec: { src: 'spec' }
    },

    // Any file versioning to do?
    versions: {
        styles: {},
        scripts: {}
    },

    // Should we concatenate any JS or CSS files?
    concatenate: {
        css: {},
        js: {}
    },

    // Where should compiled CSS be saved?
    cssOutput: 'public/css',

    // Where should compiled JS be saved?
    jsOutput: 'public/js'

};

var config = Elixir.config;

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

module.exports = Elixir;
