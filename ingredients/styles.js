var elixir = require('laravel-elixir');
var cssMinifier = require('gulp-minify-css');
var gulpCombiner = require('./helpers/GulpCombiner.js');

/*
 |----------------------------------------------------------------
 | CSS File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your style sheet files
 | in order, which provides a quick and simple way to reduce
 | the number of HTTP requests your application fires off.
 |
 */

elixir.extend('styles', function(styles, baseDir, output) {

    return gulpCombiner({
        assets: styles,
        baseDir: baseDir,
        output: output,
        taskName: 'styles',
        minifier: cssMinifier,
        extension: 'css',
    });

});
