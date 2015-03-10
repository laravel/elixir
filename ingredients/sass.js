var gulp = require('gulp');
var elixir = require('laravel-elixir');
var compile = require('./commands/CompileCSS');
var _ = require('underscore');

var inProduction = elixir.config.production;

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

elixir.extend('sass', function(src, output, options, useRuby) {

    options = function() {
        var outputStyle = useRuby ? 'style' : 'outputStyle';

        return _.extend({
            outputStyle: inProduction ? 'compressed' : 'nested'
        }, options);
    }();

    return compile({
        compiler: 'Sass',
        plugin: useRuby ? 'gulp-ruby-sass' : 'sass',
        pluginOptions: options,
        src: src,
        output: output,
        search: '**/*.+(sass|scss)'
    });

});
