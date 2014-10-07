var gulp = require('gulp');
var _ = require('underscore');
var plugins = require('gulp-load-plugins')();
var config = require('../Elixir').config;
var mustRunFirst = _.intersection(config.tasks, [
    'sass', 'less', 'styles'
]);


/*
 |--------------------------------------------------------------------------
 | Style Versioning
 |--------------------------------------------------------------------------
 |
 | This task will append a unique hash to any relevant files that are fed to
 | it, and prepare a manifest file. This will help with cache-busting.
 |
 */
gulp.task('versionStyles', mustRunFirst, function() {
    gulp.src(config.versions.styles.src)
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.cssOutput))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(config.cssOutput));
});