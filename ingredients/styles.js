var elixir = require('laravel-elixir');
var combine = require('./commands/MergeFiles.js');
var MergeRequest = require('./commands/MergeRequest');

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

elixir.extend('styles', function(styles, outputDir, baseDir) {
    outputDir = outputDir || elixir.config.cssOutput;

    return combine(mergeRequest(styles, outputDir, baseDir));
});

elixir.extend('stylesIn', function(baseDir, outputDir) {
    outputDir = outputDir || baseDir;

    return combine(mergeRequest('**/*.css', outputDir, baseDir));
});

var mergeRequest = function(styles, outputDir, baseDir) {
    var request = new MergeRequest(styles, baseDir, outputDir, 'css');

    request.taskName = 'styles';
    request.minifier = require('gulp-minify-css');

    return request;
};
