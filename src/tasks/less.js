import Compiler from '../Compiler';

/*
 |----------------------------------------------------------------
 | Less Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Less, including minification and
 | and auto-prefixing. Less is one of the CSS pre-processors
 | supported by Elixir, along with the Sass CSS processor.
 |
 */

Elixir.extend('less', function(src, output, options) {
    let paths = getPaths(src, output);

    new Elixir.Task('less', new Compiler(options), paths)
        .watch(paths.src.baseDir + '/**/*.less')
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
        .src(src, Elixir.config.get('assets.css.less.folder'))
        .output(output || Elixir.config.get('public.css.outputFolder'), 'app.css');
};
