var gulp         = require('gulp');
var gulpIf       = require('gulp-if');
var babelify     = require('babelify');
var watchify     = require('watchify');
var gutil        = require('gulp-util');
var uglify       = require('gulp-uglify');
var buffer       = require('vinyl-buffer');
var browserify   = require('browserify');
var partialify   = require('partialify');
var elixir       = require('laravel-elixir');
var parsePath    = require('parse-filepath');
var source       = require('vinyl-source-stream');
var merge        = require('merge-stream');
var utilities    = require('./commands/Utilities');
var Notification = require('./commands/Notification');

var bundle;

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
    };
};


/**
 * Get a standard Browserify stream.
 *
 * @param {string|array} src
 * @param {object}       options
 */
var browserifyStream = function(data) {
    var stream = browserify(data.src, data.options);

    stream.transform(babelify, { stage: 0 });
    stream.transform(partialify);

    return stream;
};


/**
 * Get a Browserify stream, wrapped in Watchify.
 *
 * @param {string|array} src
 * @param {object}       options
 */
var watchifyStream = function(data) {
    var browserify = watchify(browserifyStream(data));

    browserify.on('log', gutil.log);
    browserify.on('update', function() {
        bundle(browserify, data);
    });

    return browserify;
}


/**
 * Build the Gulp task.
 */
var buildTask = function() {
    gulp.task('browserify', function() {
        var dataSet = elixir.config.collections.browserify;
        var stream = elixir.config.watchify
            ? watchifyStream
            : browserifyStream;

        return merge.apply(this, dataSet.map(function(data) {
            bundle = function(stream, data) {
                utilities.logTask('Running Browserify', data.src);
                return stream
                    .bundle()
                    .on('error', function(e) {
                        new Notification().error(e, 'Browserify Failed!');
                        this.emit('end');
                    })
                    .pipe(source(data.destination.fileName))
                    .pipe(buffer())
                    .pipe(gulpIf(elixir.config.production, uglify()))
                    .pipe(gulp.dest(data.destination.dir));
            };

            return bundle(stream(data), data);
        }));
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

    elixir.config.saveTask('browserify', {
        src: utilities.buildGulpSrc(src, './' + baseDir, search),
        destination: getDestination(output || this.jsOutput),
        options: options || {}
    });

    buildTask();

    return this
        // Watchify will handle the "watching."
        .registerWatcher('browserify', function() {})
        .queueTask('browserify');
});
