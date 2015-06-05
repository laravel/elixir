var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var babelify     = require('babelify');
var uglify       = require('gulp-uglify');
var buffer       = require('vinyl-buffer');
var browserify   = require('browserify');
var partialify   = require('partialify');
var elixir       = require('laravel-elixir');
var parsePath    = require('parse-filepath');
var source       = require('vinyl-source-stream');
var utilities    = require('./commands/Utilities');
var Notification = require('./commands/Notification');


/**
 * Calculate the correct save destination.
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
            .on('error', function(e) {
                new Notification().error(e, 'Browserify Failed!');

                this.emit('end');
            })
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
    src     = utilities.buildGulpSrc(src, './' + baseDir, search);
    output  = output || this.jsOutput;
    options = options || {};

    buildTask(src, output, options);

    return this.registerWatcher('browserify', baseDir + search)
               .queueTask('browserify');
});
