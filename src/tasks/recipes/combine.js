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
    let defaultName;

    if (unknownOutputPath(src, output)) {
        Elixir.fail(
            "Please update your Gulpfile, and add a full output path as the " +
            "second argument to your mix.combine() call. " +
            "\n\nMaybe: mix.combine('" + JSON.stringify(src) + "', " +
            "'./public/js/combined" + parse(src[0]).ext + "')"
        );
    }

    if (typeof src == 'string') {
        let srcSegments = parse(src);

        if (! output) {
            // If we have no output at all, then we'll
            // use a src.min.extension convention.
            output = srcSegments.path.replace(
                srcSegments.ext, `.min${srcSegments.ext}`
            );
        }

        if (onlyAnOutputDirectoryWasProvided(output)) {
            defaultName = srcSegments.basename;
        }
    }

    return new Elixir.GulpPaths()
        .src(src, baseDir)
        .output(output, defaultName);
};


/**
 * Determine if we're unable to decipher the output path.
 *
 * @param  {mixed} src
 * @param  {mixed} output
 * @return {boolean}
 */
function unknownOutputPath(src, output) {
    return Array.isArray(src) && (! output || ! parse(output).ext)
}


/**
 * Determine if a directory was provided as the output path.
 *
 * @param  {mixed} output
 * @return {boolean}
 */
function onlyAnOutputDirectoryWasProvided(output) {
    return output && (! parse(output).extname);
}
