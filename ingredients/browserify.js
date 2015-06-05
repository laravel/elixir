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
var merge        = require('merge-stream');
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
 */
var buildTask = function() {
    gulp.task('browserify', function() {
        var dataSet = elixir.config.collections.browserify;

        return merge.apply(this, dataSet.map(function(data) {
            utilities.logTask('Running Browserify', data.src);

            return browserify(data.src, data.options)
                .transform(babelify, { stage: 0 })
                .transform(partialify)
                .bundle()
                .on('error', function(e) {
                    new Notification().error(e, 'Browserify Failed!');
                    this.emit('end');
                })
                .pipe(source(data.destination.fileName))
                .pipe(buffer())
                .pipe(gulpIf(elixir.config.production, uglify()))
                .pipe(gulp.dest(data.destination.dir));
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

    return this.registerWatcher('browserify', baseDir + search)
               .queueTask('browserify');
});
