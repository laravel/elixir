var utilities = require('./commands/Utilities');
var source = require('vinyl-source-stream');
var parsePath = require('parse-filepath');
var browserify = require('browserify');
var elixir = require('laravel-elixir');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var gulpIf = require('gulp-if');
var gulp = require('gulp');


/**
 * Calculate the correct destination.
 *
 * @param {string} output
 */
var getDestination = function(output) {
    output = parsePath(output);

    var saveDir = output.extname
        ? output.dirname
        : (output.dirname + '/' + output.basename);

    var saveFile = output.extname ? output.basename : 'bundle.js';

    return {
        saveFile: saveFile,
        saveDir: saveDir
    }
};

/**
 * Build the Gulp task.
 *
 * @param {array}  src
 * @param {string} output
 * @param {object} options
 */
var buildTask = function(src, output, options) {
    var destination = getDestination(output);

    gulp.task('browserify', function() {
        return browserify(src, options)
            .transform(babelify, { stage: 0 })
            .bundle()
            .pipe(source(destination.saveFile))
            .pipe(buffer())
            .pipe(gulpIf(elixir.config.production, uglify()))
            .pipe(gulp.dest(destination.saveDir));
    });
};


/*
 |----------------------------------------------------------------
 | Browserify Task
 |----------------------------------------------------------------
 |
 | This task will manage your entire Browserify workflow, from
 | scratch! Also, it will channel all files through Babelify
 | so that you may use all the ES6 goodness you can stand.
 |
 */

elixir.extend('browserify', function(src, output, baseDir, options) {
    var search = '/**/*.+(js|jsx|babel)';

    baseDir = baseDir || elixir.config.assetsDir + 'js';
    src = utilities.buildGulpSrc(src, './' + baseDir, search);
    output = output || this.jsOutput;
    options = options || {};

    utilities.logTask('Running Browserify', src);

    buildTask(src, output, options);

    return this.registerWatcher('browserify', baseDir + search)
               .queueTask('browserify');
});
