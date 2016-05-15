import Elixir from 'laravel-elixir';

const config = Elixir.config;
let gutil;
let buffer;
let source;
let browserify;
let watchify;
let bundle;

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
    const paths = prepGulpPaths(src, baseDir, output);

    loadPlugins();

    new Elixir.Task('browserify', function(gulp, $) {
        const stream = config.js.browserify.watchify.enabled
            ? watchifyStream
            : browserifyStream;

        bundle = function(stream, paths) {
            this.log(paths.src, paths.output);

            return (
                stream
                .bundle()
                .on('error', function(e) {
                    new Elixir.Notification().error(
                        e, 'Browserify Failed!'
                    );

                    this.emit('end');
                })
                .pipe(source(paths.output.name))
                .pipe(buffer())
                .pipe($.if(config.sourcemaps, $.sourcemaps.init({ loadMaps: true })))
                .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
                .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
                .pipe(gulp.dest(paths.output.baseDir))
                .pipe(new Elixir.Notification('Browserify Compiled!'))
            );
        }.bind(this);

        return bundle(
            stream({
                paths: paths,
                options: options || config.js.browserify.options
            }),
            paths
        );
    })
    .watch(); // Register a watcher, but Watchify will do the workload.
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
const prepGulpPaths = function(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'bundle.js');
};


/**
 * Get a standard Browserify stream.
 *
 * @param {object} data
 */
const browserifyStream = function(data) {
    const stream = browserify(data.paths.src.path, data.options);

    config.js.browserify.transformers.forEach(transformer => {
        stream.transform(
            require(transformer.name), transformer.options || {}
        );
    });

    config.js.browserify.plugins.forEach(plugin => {
        stream.plugin(
            require(plugin.name), plugin.options || {}
        );
    });

    config.js.browserify.externals.forEach(external => {
        stream.external(external);
    });

    return stream;
};


/**
 * Get a Browserify stream, wrapped in Watchify.
 *
 * @param {object} data
 */
const watchifyStream = function(data) {
    const browserify = watchify(
        browserifyStream(data),
        config.js.browserify.watchify.options
    );

    browserify.on('log', gutil.log);
    browserify.on('update', () => bundle(browserify, data.paths));

    return browserify;
};


/**
 * Load the required Gulp plugins on demand.
 */
const loadPlugins = function () {
    browserify = require('browserify');
    watchify = require('watchify');
    gutil = require('gulp-util');
    buffer = require('vinyl-buffer');
    source = require('vinyl-source-stream');
};
