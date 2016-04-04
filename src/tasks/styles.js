import gulp from 'gulp';
import Elixir from 'laravel-elixir';

const $ = Elixir.Plugins;
const config = Elixir.config;

let CleanCSS;
let map;

/*
 |----------------------------------------------------------------
 | CSS File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your style sheet files
 | in order, which provides a quick and simple way to reduce
 | the number of HTTP requests your application fires off.
 |
 */

Elixir.extend('styles', function(styles, output, baseDir) {
    var paths = prepGulpPaths(styles, baseDir, output);

    loadPlugins();

    new Elixir.Task('styles', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


Elixir.extend('stylesIn', function(baseDir, output) {
    var paths = prepGulpPaths('**/*.css', baseDir, output);

    new Elixir.Task('stylesIn', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


/**
 * Trigger the Gulp task logic.
 *
 * @param {GulpPaths} paths
 */
const gulpTask = function(paths) {
    this.log(paths.src, paths.output);

    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.concat(paths.output.name))
        .pipe($.if(config.production, minify()))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new Elixir.Notification('Stylesheets Merged!'))
    );
};

/**
 * Prepare the minifier instance.
 */
const minify = function () {
    return map((buff, filename) => {
        return new CleanCSS(config.css.minifier.pluginOptions)
            .minify(buff.toString())
            .styles;
    });
};

/**
 * Load the required Gulp plugins on demand.
 */
const loadPlugins = function () {
    CleanCSS = require('clean-css');
    map = require('vinyl-map');
};

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
        .src(src, baseDir || config.get('assets.css.folder'))
        .output(output || config.get('public.css.outputFolder'), 'all.css');
};
