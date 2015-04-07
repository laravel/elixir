var gulp = require('gulp');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var config = require('laravel-elixir').config;
var parsePath = require('parse-filepath');
var _ = require('underscore');

/**
 * Parse the Gulp source path.
 *
 * @param  {string} src
 * @return {object}
 */
var parseSrc = function(src) {
    var path = parsePath(src);
    var isDir = (path.basename == path.name);

    return _.extend(path, {
        path: src + (isDir ? '/**/*' : ''),
        isDir: isDir
    });
};


/**
 * Parse the Gulp destination path.
 *
 * @param  {string} dest
 * @return {object}
 */
var parseDest = function(dest) {
    var path = parsePath(dest);
    var isDir = (path.basename == path.name);

    return _.extend(path, { path: isDir ? dest : path.dirname, isDir: isDir });
};


/**
 * Create the Gulp task.
 *
 * @return {void}
 */
var buildTask = function() {
    var stream;

    gulp.task('copy', function() {
        config.duplicate.forEach(function(toCopy) {
            stream = gulp
                    .src(toCopy.src.path)
                    .pipe(gulpif( ! toCopy.dest.isDir, rename(toCopy.dest.basename)))
                    .pipe(gulp.dest(toCopy.dest.path));
        });

        return stream;
    });
};


module.exports = function(src, dest) {
    src = Array.isArray(src) ? src : [src];

    src.forEach(function(src) {
        config.duplicate.push({
            src: parseSrc(src),
            dest: parseDest(dest)
        });
    });

    buildTask();

    return config.queueTask('copy');
};
