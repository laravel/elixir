var source = require('vinyl-source-stream');
var parsePath = require('parse-filepath');
var browserify = require('browserify');
var elixir = require('laravel-elixir');
var utilities = require('./Utilities');
var reactify = require('reactify');
var babelify = require('babelify');
var gulpif = require('gulp-if');
var gulp = require('gulp');


/**
 * Calculate the correct destination.
 *
 * @param string output
 */
var getDestination = function(output) {
    output = parsePath(output);

    var saveDir = output.extname
        ? output.dirname
        : (output.dirname + '/' + output.basename);

    var saveFile = output.extname ? output.basename : 'bundle.js';

    return {
        saveFile: saveFile,
        saveDir: saveDir
    }
};

/**
 * Build the Gulp task.
 *
 * @param array src
 */
var buildTask = function(src) {
    var destination = getDestination(output);

    gulp.task('browserify', function() {
        return browserify(src)
            .transform('babelify')
            .bundle()
            .pipe(source(destination.saveFile))
            .pipe(gulp.dest(destination.saveDir));
    });
};


elixir.extend('browserify', function(src, output) {

    src = utilities.buildGulpSrc(src, './' + this.assetsDir, '**/*.jsx');

    utilities.logTask('Running Browserify', src);

    buildTask(src, output || this.jsOutput);

    this.queueTask('browserify');
});
