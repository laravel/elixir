import {extend} from 'underscore';

let $ = Elixir.Plugins;
let config = Elixir.config;
let gulpWebpack, buble;

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation and Compilation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

Elixir.extend('scripts', function(scripts, output, baseDir, options) {
    loadPlugins();

    let paths = prepGulpPaths(scripts, baseDir, output);

    new Elixir.Task('scripts', function() {
        return gulpTask.call(this, paths, options);
    });
});


Elixir.extend('scriptsIn', function(baseDir, output) {
    let paths = prepGulpPaths('**/*.js', baseDir, output);

    new Elixir.Task('scriptsIn', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


/**
 * Trigger the Gulp task logic.
 *
 * @param {GulpPaths}   paths
 * @param {object|null} options
 */
function gulpTask(paths, options) {
    this.log(paths.src, paths.output);

    return (
        gulp
        .src(paths.src.path)
        .pipe(webpack(options, paths.output.name))
        .on('error', function(e) {
            new Elixir.Notification().error(e, 'Webpack Compilation Failed!');

            this.emit('end');
        })
        .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new Elixir.Notification('Scripts Merged and Compiled!'))
    );
};


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
function prepGulpPaths(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'all.js');
}


/**
 * Fetch the appropriate Webpack configuration.
 *
 * @param  {object|null} options
 * @param  {string}      outputFile
 * @return {object}
 */
function webpack(options, outputFile) {
    return gulpWebpack(extend({
        watch: Elixir.isWatching(),
        devtool: config.sourcemaps ? 'source-map' : '',
        output: {
            filename: outputFile
        },
        module: {
            loaders: config.js.webpack.loaders
        }
    }, options), require('webpack'));
}


/**
 * Lazy-load the required Gulp plugins on demand.
 */
function loadPlugins()
{
    gulpWebpack = require('webpack-stream');
    buble = require('buble-loader');
}
