var fs = require('fs');
var del = require('del');
var gulp = require('gulp');
var rev = require('gulp-rev');
var Elixir = require('laravel-elixir');
var vinylPaths = require('vinyl-paths');
var parsePath  = require('parse-filepath');

var publicPath  = Elixir.config.publicPath;


/*
 |----------------------------------------------------------------
 | Versioning / Cache Busting
 |----------------------------------------------------------------
 |
 | This task will append a small hash on the end of your file
 | and generate a manifest file which contains the current
 | "version" of the filename for the application to use.
 |
 */

Elixir.extend('version', function(src, buildPath) {
    var paths = prepGulpPaths(src, buildPath);

    new Elixir.Task('version', function() {
        var files = vinylPaths();
        var manifest = paths.output.baseDir + '/rev-manifest.json';

        this.log(paths.src, paths.output);

        emptyBuildPathFiles(paths.output.baseDir, manifest);

        return (
            gulp.src(paths.src.path, { base: './' + publicPath })
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(files)
            .pipe(rev())
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(rev.manifest())
            .pipe(gulp.dest(paths.output.baseDir))
            .on('end', function() {
                // We'll get rid of the duplicated file that
                // usually gets put in the "build" folder,
                // alongside the suffixed version.
                del(files.paths, { force: true });

                // We'll also copy over relevant sourcemap files.
                copyMaps(paths.src.path, paths.output.baseDir);
            })
        );
    })
    .watch(paths.src.path)
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  buildPath
 * @return {object}
 */
var prepGulpPaths = function(src, buildPath) {
    src = Array.isArray(src) ? src : [src];

    return new Elixir.GulpPaths()
        .src(src)
        .output(buildPath || config.get('public.versioning.buildFolder'));
};


/**
 * Empty all relevant files from the build directory.
 *
 * @param  {string} buildPath
 * @param  {string} manifest
 */
var emptyBuildPathFiles = function(buildPath, manifest) {
    fs.stat(manifest, function(err, stat) {
        if (! err) {
            manifest = JSON.parse(fs.readFileSync(manifest));

            for (var key in manifest) {
                del.sync(buildPath + '/' + manifest[key], { force: true });
            }
        }
    });
};


/**
 * Copy source maps to the build directory.
 *
 * @param  {string} src
 * @param  {string} buildPath
 * @return {object}
 */
var copyMaps = function(src, buildPath) {
    // We'll first get any files from the src
    // array that have companion .map files.
    var mappings = [];

    src.forEach(function(file) {
        var map = file + '.map';

        if (fs.existsSync(map)) {
            mappings.push(map);
        }
    });

    // And then we'll loop over this mapping array
    // and copy each over to the build directory.
    mappings.forEach(function(mapping) {
        var map = mapping.replace(publicPath, buildPath);

        gulp.src(mapping).pipe(gulp.dest(parsePath(map).dirname));
    });
};
