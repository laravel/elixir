var gulp = require('gulp');
var Elixir = require('laravel-elixir');

var $ = Elixir.Plugins;
var config = Elixir.config;


/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

Elixir.extend('scripts', function(scripts, output, baseDir) {
    var paths = prepGulpPaths(scripts, baseDir, output);

    new Elixir.Task('scripts', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


Elixir.extend('scriptsIn', function(baseDir, output) {
    var paths = prepGulpPaths('**/*.js', baseDir, output);

    new Elixir.Task('scriptsIn', function() {
        return gulpTask.call(this, paths);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


Elixir.extend('babel', function(scripts, output, baseDir, options) {
    var paths = prepGulpPaths(scripts, baseDir, output);

    new Elixir.Task('babel', function() {
        var babelOptions = options || config.js.babel.options;

        return gulpTask.call(this, paths, babelOptions);
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


/**
 * Trigger the Gulp task logic.
 *
 * @param {object}      paths
 * @param {object|null} babel
 */
var gulpTask = function(paths, babel) {
    this.log(paths.src, paths.output);

    return (
        gulp
        .src(paths.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe($.concat(paths.output.name))
        .pipe($.if(babel, $.babel(babel)))
        .on('error', function(e) {
            new Elixir.Notification().error(e, 'Babel Compilation Failed!');
            this.emit('end');
        })
        .pipe($.if(config.production, $.uglify()))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(paths.output.baseDir))
        .pipe(new Elixir.Notification('Scripts Merged!'))
    );
};


/**
 * Prep the Gulp src and output paths.
 *
 * @param {string|array} src
 * @param {string|null}  baseDir
 * @param {string|null}  output
 */
var prepGulpPaths = function(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.js.folder'))
        .output(output || config.get('public.js.outputFolder'), 'all.js');
};
