import CombineTask from '../CombineTask';

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

Elixir.extend('combine', task);
Elixir.extend('compress', task);


/**
 * The main Elixir task that both  mix.combine()
 * and mix.compress() defer to.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @param  {string|null}  baseDir
 */
function task(src, output, baseDir) {
    new CombineTask('combine', getPaths(src, baseDir, output));
}


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string}       baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
function getPaths(src, baseDir, output) {
    // If you gave us an array of src files, but no
    // explicit output name, we need more specifics.
    if (Array.isArray(src) && (! output || ! parse(output).ext)) {
        Elixir.fail(
            "Please update your Gulpfile, and add a full output path as the " +
            "second argument to your mix.combine() call. " +
            "\n\nMaybe: mix.combine('" + JSON.stringify(src) + "', " +
            "'./public/js/combined" + parse(src[0]).ext + "')"
        );
    }

    // If the user is compressing a single file, and
    // didn't provide an output path, we will just
    // tack .min onto the file.
    if (! Array.isArray(src) && ! output) {
         let segments = parse(src);

        output = segments.path.replace(
            segments.ext, `.min${segments.ext}`
        );
    }

    return new Elixir.GulpPaths()
        .src(src, baseDir)
        .output(output);
};
