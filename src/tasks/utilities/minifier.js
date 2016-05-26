import CleanCSS from 'clean-css';


/**
 * Minify the Gulp src files.
 *
 * @param  {object} output
 */
export default function (output) {
    switch (output.extension) {
        case '.css':
            return minifyCss();
        case '.js':
            return minifyJs();
    }

    Elixir.fail(
        'Hmm, not sure how to compress this type of file. ' +
        'Stick with CSS or JavaScript files!'
    );
};


/**
 * Minify the Gulp CSS files.
 */
function minifyCss() {
    return map(function (buff, filename) {
        return new CleanCSS(
            Elixir.config.css.minifier.pluginOptions
        )
        .minify(buff.toString())
        .styles;
    });
}


/**
 * Minify the Gulp JS files.
 */
function minifyJs() {
    return Elixir.Plugins.uglify(
        Elixir.config.js.uglify.options
    );
}
