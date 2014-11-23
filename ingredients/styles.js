var elixir = require('laravel-elixir');
var cssMinifier = require('gulp-minify-css');
var combine = require('./helpers/MergeFiles.js');

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

    return combine({
        assets: styles,
        baseDir: baseDir,
        output: output,
        taskName: 'styles',
        minifier: cssMinifier,
        extension: 'css',
    });

});

elixir.extend('stylesIn', function(baseDir, output) {

    return combine({
        assets: '**/*.css',
        baseDir: baseDir,
        output: output || baseDir,
        taskName: 'styles',
        minifier: cssMinifier,
        extension: 'css'
    });

});
