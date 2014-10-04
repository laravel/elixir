var gulp = require('gulp');
var _ = require('underscore');
var plugins = require('gulp-load-plugins')();
var Elixir = require('../Elixir');
var config = Elixir.config;


/*
 |--------------------------------------------------------------------------
 | Style Versioning
 |--------------------------------------------------------------------------
 |
 | This task will append a unique hash to any relevant files that are fed to
 | it, and prepare a manifest file. This will help with cache-busting.
 |
 */
var mustRunFirst = _.intersection(Elixir.tasks, [
    'styles', 'sass', 'less'
]);

gulp.task('versionStyles', mustRunFirst, function() {
    gulp.src(config.versions.styles.src)
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.cssOutput))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(config.cssOutput));
});