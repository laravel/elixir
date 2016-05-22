import Compiler from './compilers/CssCompiler';

/*
 |----------------------------------------------------------------
 | Sass Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Sass, including minification and
 | and auto-prefixing. Sass is one of the CSS pre-precessors
 | supported by Elixir, along with the Less CSS processor.
 |
 */

Elixir.extend('sass', function(src, output, options) {
    let paths = getPaths(src, output);

    new Elixir.Task('sass', new Compiler(options), paths)
        .watch(paths.src.baseDir + '/**/*.+(sass|scss)')
        .ignore(paths.output.path);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
function getPaths(src, output) {
    return new Elixir.GulpPaths()
        .src(src, Elixir.config.get('assets.css.sass.folder'))
        .output(output || Elixir.config.get('public.css.outputFolder'), 'app.css');
};
