import Compiler from './compilers/JavaScriptCompiler';

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation and Compilation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

Elixir.extend('scripts', function(scripts, output, baseDir, options) {
    let paths = prepGulpPaths(scripts, baseDir, output);

    new Elixir.Task('scripts', new Compiler(options), paths);
});


Elixir.extend('scriptsIn', function(baseDir, output) {
    let paths = prepGulpPaths('**/*.js', baseDir, output);

    new Elixir.Task('scriptsIn', new Compiler(options, paths));
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
function prepGulpPaths(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || Elixir.config.get('assets.js.folder'))
        .output(output || Elixir.config.get('public.js.outputFolder'), 'all.js');
}
