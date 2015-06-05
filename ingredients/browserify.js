var utilities = require('./commands/Utilities');
var source = require('vinyl-source-stream');
var parsePath = require('parse-filepath');
var browserify = require('browserify');
var partialify = require('partialify');
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
    var parsed = utilities.parse(output);

    return {
        fileName: parsed.name || 'bundle.js',
        dir: parsed.baseDir
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
        utilities.logTask('Running Browserify', src);

        return browserify(src, options)
            .transform(babelify, { stage: 0 })
            .transform(partialify)
            .bundle()
            .pipe(source(destination.fileName))
            .pipe(buffer())
            .pipe(gulpIf(elixir.config.production, uglify()))
            .pipe(gulp.dest(destination.dir));
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

    buildTask(src, output, options);

    return this.registerWatcher('browserify', baseDir + search)
               .queueTask('browserify');
});
