var elixir = require('laravel-elixir');
var combine = require('./commands/MergeFiles.js');
var MergeRequest = require('./commands/MergeRequest');

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

elixir.extend('scripts', function(scripts, outputDir, baseDir) {
    outputDir = outputDir || elixir.config.jsOutput;

    return combine(mergeRequest(scripts, outputDir, baseDir));
});

elixir.extend('scriptsIn', function(baseDir, outputDir) {
    outputDir = outputDir || baseDir;

    return combine(mergeRequest('**/*.js', outputDir, baseDir));
});

elixir.extend('babel', function(scripts, outputDir, baseDir, options) {
    outputDir = outputDir || elixir.config.jsOutput;
    options = options || elixir.config.babelOptions;

    return combine(mergeRequest(scripts, outputDir, baseDir, options));
});

var mergeRequest = function(scripts, outputDir, baseDir, babel) {
    var request = new MergeRequest(scripts, baseDir, outputDir, 'js');

    request.taskName = 'scripts';
    request.minifier = require('gulp-uglify');

    if (babel) {
        request.babel = babel;
    }

    return request;
};
