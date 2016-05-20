/*
 |----------------------------------------------------------------
 | Asset Compression
 |----------------------------------------------------------------
 |
 | This task manages the process of concatenating and minifying
 | both your JavaScript and CSS files. Pass a single script,
 | or even array of stylesheets. We will then process it.
 |
 */

Elixir.extend('compress', function(src, output, baseDir) {
    let paths = prepGulpPaths(src, baseDir, output);

    new Elixir.Task('compress', function($, config) {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.concat(paths.output.name))
            .pipe(minify(paths.output))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('Assets Minified!'))
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
    // If you gave us an array of source files, and
    // no explicit output name, we'll need you to
    // be more specific.
    if (Array.isArray(src) && ! output) {
        Elixir.fail(
            'Please provide an output path ' +
            'for your mix.compress(src, output) call.'
        );
    }

    // If the user provided no output path at all, we
    // will do our best to provide a sensible default.
    if (! output) {
         let segments = parse(src);

        output = segments.path.replace(
            segments.ext, `.min${segments.ext}`
        );
    }

    return new Elixir.GulpPaths()
        .src(src, baseDir)
        .output(output, parse(Array.isArray(src) ? src[0] : src).base)
};


/**
 * Retrieve the proper minifier.
 *
 * @param  {object} output
 * @return {stream}
 */
function minify(output) {
    if (output.extension == '.css') {
        return require('./shared/CssMinifier').default();
    }

    if (output.extension == '.js') {
        return Elixir.Plugins.uglify(
            Elixir.config.js.uglify.options
        );
    }

    Elixir.fail(
        'Hmm, not sure how to compress this type of file. ' +
        'Stick with CSS or JavaScript files!'
    );
}
