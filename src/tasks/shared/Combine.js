export default function (name, paths) {
    new Elixir.Task(name, function ($, config) {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe($.concat(paths.output.name))
            .pipe($.if(config.production, minify(paths.output)))
            .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('Assets Combined!'))
        );
    })
    .watch(paths.src.path)
    .ignore(paths.output.path);
};


/**
 * Retrieve the proper minifier.
 *
 * @param  {object} output
 * @return {stream}
 */
function minify(output) {
    if (output.extension == '.css') {
        return require('./CssMinifier').default();
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
