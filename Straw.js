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

    // Which CSS preprocessor are we using?
    cssPreprocessor: false,

    // What is the path to the CSS preprocessor source?
    cssPreprocessorSource: false,

    // Which JS preprocessor are we using?
    jsPreprocessor: false,

    // What is the path to the JS preprocessor source?
    jsPreprocessorSource: false,

    // Where should compiled CSS be saved?
    cssOutput: 'public/css',

    // Where should compiled JS be saved?
    jsOutput: 'public/js',

    // What is the path to the PHPUnit tests?
    testPath: 'tests',

    // What is the path to the PHPSpec tests?
    specPath: 'spec',

    // Any CSS files to hash?
    hashesStyles: '',

    // Any JS files to hash?
    hashesScripts: '',

    // Should we concatenate any JS or CSS files?
    concatenate: {
        css: {
            source: '',
            to: ''
        },
        js: {
            source: '',
            to: ''
        }
    }

};

var config = Straw.config;

config.useCssPreprocessor = function(type, source, output) {
    this.cssPreprocessor = type;
    this.cssPreprocessorSource = source;
    if (output) this.cssOutput = output;

    queueTask(type);

    return this;
},


config.useSass = function(source, output) {
    source = source || 'resources/assets/sass';

    return this.useCssPreprocessor('sass', source, output);
},


config.useLess = function(source, output) {
    source = source || 'resources/assets/less';

    return this.useCssSPreprocessor('less', source, output);
},


config.useCoffee = function(source, output) {
    source = source || 'resources/assets/coffee';

    this.jsPreprocessor = 'coffee';
    this.jsPreprocessorSource = source;
    if (output) this.jsOutput = output;

    queueTask('coffee');

    return this;
},


config.runPHPUnit = function(path) {
    if (path) this.testPath = path;

    queueTask('phpunit');

    return this;
},


config.runPHPSpec = function(path) {
    if (path) this.specPath = path;

    queueTask('phpspec');

    return this;
},


config.combine = function(type, files, baseDir, output) {
    var extension = '.' + type;

    files = files.map(function(file) {
        file.indexOf(extension) > -1 || (file += extension);

        return (baseDir || '.') + '/' + file;
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