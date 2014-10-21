var gulp = require('gulp');
var elixir = require('laravel-elixir');
var gulpCssCompiler = require('./helpers/GulpCssCompiler');
var _ = require('underscore');

var inProduction = elixir.config.production


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

elixir.extend('sass', function(src, output, options) {

    var defaults = {
        outputStyle: inProduction ? 'compressed' : 'nested'
    };

    return gulpCssCompiler({
        compiler: 'Sass',
        pluginName: 'sass',
        pluginOptions: _.extend(defaults, options),
        src: src,
        output: output,
        search: '**/*.+(sass|scss)'
    });

});
