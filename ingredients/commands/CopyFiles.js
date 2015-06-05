var gulp      = require('gulp');
var gulpif    = require('gulp-if');
var utilities = require('./Utilities');
var rename    = require('gulp-rename');
var merge     = require('merge-stream');
var config    = require('laravel-elixir').config;


/**
 * Create the Gulp task.
 */
var buildTask = function() {
    gulp.task('copy', function() {
        return merge.apply(this, config.collections.copy.map(function(data) {
            data.src.isDir && (data.src.path += '/**');

            utilities.logTask(
                'Copying ' + data.src.path + ' to',
                data.dest.path
            );

            return gulp
                .src(data.src.path)
                .pipe(gulpif( ! data.dest.isDir, rename(data.dest.name)))
                .pipe(gulp.dest(data.dest.baseDir));
        }));
    });
};


module.exports = function(src, dest) {
    src = Array.isArray(src) ? src : [src];

    src.forEach(function(src) {
        config.saveTask('copy', {
            src: utilities.parse(src),
            dest: utilities.parse(dest)
        });
    });

    buildTask();

    return config.queueTask('copy');
};
