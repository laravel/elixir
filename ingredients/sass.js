var gulp = require('gulp');
var elixir = require('laravel-elixir');
var compile = require('./helpers/CompileCSS');
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

    options = _.extend({
        outputStyle: inProduction ? 'compressed' : 'nested',
        includePaths: [elixir.config.bowerDir + "/bootstrap-sass-official/assets/stylesheets"]
    }, options);

    return compile({
        compiler: 'Sass',
        pluginName: 'sass',
        pluginOptions: options,
        src: src,
        output: output,
        search: '**/*.+(sass|scss)'
    });

});
