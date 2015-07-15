var gulp = require('gulp');
var gutil = require('gulp-util');
var babelify = require('babelify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var Elixir = require('laravel-elixir');
var browserify = require('browserify');
var partialify = require('partialify');
var source = require('vinyl-source-stream');

var bundle;
var $ = Elixir.Plugins;


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

Elixir.extend('browserify', function(src, output, baseDir, options) {
    var paths = prepGulpPaths(src, baseDir, output);

    new Elixir.Task('browserify', function() {
        var stream = Elixir.config.js.browserify.watchify
            ? watchifyStream
            : browserifyStream;

        bundle = function(stream) {
            this.log(paths.src, paths.output);

            return (
                stream
                .bundle()
                .on('error', function(e) {
                    new Elixir.Notification().error(e, 'Browserify Failed!');

                    this.emit('end');
                })
                .pipe(source(paths.output.name))
                .pipe(buffer())
                .pipe($.if(Elixir.config.production, $.uglify()))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('Browserify Compiled!'))
            );
        }.bind(this);

        return bundle(
            stream({
                src: paths.src.path,
                options: options || config.js.browserify.options
            })
        );
    })
    // We'll add this task to be watched, but Watchify
    // will handle the process, to speed things up.
    .watch();
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string}       baseDir
 * @param  {string|null}  output
 */
var prepGulpPaths = function(src, baseDir, output) {
    baseDir = baseDir || Elixir.config.js.path;

    return new Elixir.GulpPaths()
        .src(src, baseDir)
        .output(output || config.get('public.js.outputPath'), 'bundle.js');
};


/**
 * Get a standard Browserify stream.
 *
 * @param {string|array} src
 * @param {object}       options
 */
var browserifyStream = function(data) { // just use two arguments
    var stream = browserify(data.src, data.options);

    stream.transform(babelify, config.js.babel.options);
    stream.transform(partialify);

    return stream;
};


/**
 * Get a Browserify stream, wrapped in Watchify.
 *
 * @param {string|array} src
 * @param {object}       options // TODO Fix this
 */
var watchifyStream = function(data) {
    var browserify = watchify(browserifyStream(data));

    browserify.on('log', gutil.log);
    browserify.on('update', function() {
        bundle(browserify);
    });

    return browserify;
};
