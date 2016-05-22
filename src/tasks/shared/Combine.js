let CleanCSS, map;

export default function (name, paths) {
    CleanCSS = require('clean-css');
    map = require('vinyl-map');

    new Elixir.Task(name, function ($, config) {
        this.log(paths.src, paths.output);

        return (
            gulp
            .src(paths.src.path)
            .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
            .pipe($.concat(paths.output.name))
            .pipe($.if(Elixir.inProduction, minify(paths.output)))
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
        return map(function (buff, filename) {
            return new CleanCSS(
                Elixir.config.css.minifier.pluginOptions
            )
            .minify(buff.toString())
            .styles;
        });
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
