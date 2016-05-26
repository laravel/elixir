import CssTask from './conductors/CssTask';

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
    new CssTask('less', getPaths(src, output), options);
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
