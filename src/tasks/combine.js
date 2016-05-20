import filePath from 'parse-filepath';

/*
 |----------------------------------------------------------------
 | File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate an array of files. Nothing more
 | nothing less. Note that, while, say, mix.scripts() runs
 | general compilation on the files, this one does not.
 |
 */

Elixir.extend('combine', function(src, output, baseDir) {
    const paths = prepGulpPaths(src, baseDir, output);

    new Elixir.Task('combine', function($) {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.concat(paths.output.name))
            .pipe(gulp.dest(paths.output.baseDir))
        );
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string}       baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
const prepGulpPaths = function(src, baseDir, output) {
    if ( ! output || ! filePath(output).ext) {
        Elixir.fail(
            "Please update your Gulpfile, and add a full output path as the " +
            "second argument to your mix.combine() call. " +
            "\n\nMaybe: mix.combine('" + JSON.stringify(src) + "', " +
            "'./public/js/combined" + filePath(src[0]).ext + "')"
        );
    }


    return new Elixir.GulpPaths()
        .src(src, baseDir)
        .output(output);
};
