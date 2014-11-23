var elixir = require('laravel-elixir');
var combine = require('./helpers/MergeFiles.js');
var MergeRequest = require('./helpers/MergeRequest');

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

elixir.extend('scripts', function(scripts, baseDir, outputDir) {
    outputDir = outputDir || elixir.config.jsOutput;

    return combine(mergeRequest(scripts, baseDir, outputDir))
});

elixir.extend('scriptsIn', function(baseDir, outputDir) {
    outputDir = outputDir || baseDir;

    return combine(mergeRequest('**/*.js', baseDir, outputDir));
});

var mergeRequest = function(styles, baseDir, outputDir) {
    var request = new MergeRequest(styles, baseDir, outputDir, 'js');

    request.taskName = 'scripts';
    request.minifier = require('gulp-uglify');

    return request;
};
