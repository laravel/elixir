var gulp = require('gulp');
var elixir = require('laravel-elixir');
var compile = require('./commands/CompileCSS');
var _ = require('underscore');

var inProduction = elixir.config.production;

/**
 * Prepare the Sass task.
 *
 * @param {string|array}  src
 * @param {string}        output
 * @param {object|null}   options
 * @param {bool}          useRuby
 */
var addSassTask = function(src, output, options, useRuby) {
    return compile({
        compiler: 'Sass',
        plugin: useRuby ? 'gulp-ruby-sass' : 'sass',
        pluginOptions: buildOptions(options, useRuby),
        src: src,
        output: output,
        search: '**/*.+(sass|scss)'
    });
};


/**
 * Build up the Sass plugin options.
 *
 * @param   {object} options
 * @param   {bool}   useRuby
 * @returns {object}
 */
var buildOptions = function(options, useRuby) {
    var defaults = {};
    var outputStyle = useRuby ? 'style' : 'outputStyle';

    defaults[outputStyle] = inProduction ? 'compressed' : 'nested';

    return _.extend(defaults, options);
};


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

elixir.extend('sass', addSassTask);
elixir.extend('rubySass', function(src, output, options) {
    return addSassTask(src, output, options, true);
});
