var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var _ = require('underscore');
var straw = require('../Straw');
var config = straw.config;


/*
 |--------------------------------------------------------------------------
 | File Revisioning
 |--------------------------------------------------------------------------
 |
 | This task will append a unique hash to any relevant files that are fed to
 | it, and prepare a manifest file. This will help with cache-busting.
 |
 */
var mustRunFirst = _.intersection(straw.tasks, [
    'combineStyles', 'combineScripts', 'sass', 'less', 'coffee'
]);

gulp.task('hash', mustRunFirst, function() {
    if (config.hashesScripts !== false) {
        gulp.src(config.hashesScripts || config.jsOutput + '/**/*.js')
            .pipe(plugins.rev())
            .pipe(gulp.dest(config.jsOutput))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(config.jsOutput));
    }

    if (config.hashesStyles !== false) {
        gulp.src(config.hashesStyles || config.cssOutput + '/**/*.css')
            .pipe(plugins.rev())
            .pipe(gulp.dest(config.cssOutput))
            .pipe(plugins.rev.manifest())
            .pipe(gulp.dest(config.cssOutput));
    }
});