var elixir = require('laravel-elixir');
var combine = require('./helpers/MergeFiles.js');
var MergeRequest = require('./helpers/MergeRequest');

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

elixir.extend('styles', function(styles, baseDir, outputDir) {
    outputDir = outputDir || elixir.config.cssOutput;

    return combine(mergeRequest(styles, baseDir, outputDir));
});

elixir.extend('stylesIn', function(baseDir, outputDir) {
    outputDir = outputDir || baseDir;

    return combine(mergeRequest('**/*.css', baseDir, outputDir));
});

var mergeRequest = function(styles, baseDir, outputDir) {
    var request = new MergeRequest(styles, baseDir, outputDir, 'css');

    request.taskName = 'styles';
    request.minifier = require('gulp-minify-css');

    return request;
};
