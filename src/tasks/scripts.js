import gulp from 'gulp';
import Elixir from 'laravel-elixir';

let $ = Elixir.Plugins;
let config = Elixir.config;
let gulpRollup, commonjs, buble;

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
    })
    .watch(paths.src.baseDir + '/**/*.+(js|jsx|vue)')
    .ignore(paths.output.path);
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
        .pipe(rollup(options))
        .on('error', function(e) {
            new Elixir.Notification().error(e, 'Rollup Compilation Failed!');

            this.emit('end');
        })
        .pipe($.concat(paths.output.name))
        .pipe($.if(config.production, $.uglify(config.js.uglify.options)))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
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
 * Prepare the Rollup stream with config.
 *
 * @param  {object|null} options
 * @return {mixed}
 */
function rollup(options)
{
    return gulpRollup(options || {
        plugins: [commonjs(), buble()],
        format: 'iife',
        moduleName: 'ElixirBundle',
        sourceMap: config.sourcemaps
    });
}


/**
 * Lazy-load the required Gulp plugins on demand.
 */
function loadPlugins()
{
    gulpRollup = require('gulp-rollup');
    commonjs = require('rollup-plugin-commonjs');
    buble = require('rollup-plugin-buble');
}
