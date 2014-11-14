var elixir = require('laravel-elixir');
var jsMinifier = require('gulp-uglify');
var combine = require('./helpers/GulpCombiner.js')

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

elixir.extend('scripts', function(scripts, baseDir, output) {

    return combine({
        assets: scripts,
        baseDir: baseDir,
        output: output,
        taskName: 'scripts',
        minifier: jsMinifier,
        extension: 'js'
    });

});
