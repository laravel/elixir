var elixir = require('laravel-elixir');
var compile = require('./commands/CompileCSS');

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

elixir.extend('less', function(src, output, options) {

    return compile({
        compiler: 'Less',
        plugin: 'less',
        pluginOptions: options,
        src: src,
        output: output,
        search: '**/*.less'
    });

});
