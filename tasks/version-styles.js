var gulp = require('gulp');
var _ = require('underscore');
var plugins = require('gulp-load-plugins')();
var straw = require('../Straw');
var config = straw.config;


/*
 |--------------------------------------------------------------------------
 | Style Versioning
 |--------------------------------------------------------------------------
 |
 | This task will append a unique hash to any relevant files that are fed to
 | it, and prepare a manifest file. This will help with cache-busting.
 |
 */
var mustRunFirst = _.intersection(straw.tasks, [
    'styles', 'sass', 'less'
]);

gulp.task('versionStyles', mustRunFirst, function() {
    gulp.src(config.versions.styles.src)
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.cssOutput))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(config.cssOutput));
});