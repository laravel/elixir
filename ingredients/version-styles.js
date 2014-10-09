var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;
var plugins = require('gulp-load-plugins')();

var mustRunFirst = _.intersection(config.tasks, [
    'less', 'sass', 'styles'
]);

/*
 |----------------------------------------------------------------
 | CSS Versioning / Cache Busting
 |----------------------------------------------------------------
 |
 | This task will append a small hash on the end of your file
 | and generate a manifest file which contains the current
 | "version" of the filename for the application to use.
 |
 */

gulp.task('versionStyles', mustRunFirst, function() {
    gulp.src(config.versions.styles.src)
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.cssOutput))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(config.cssOutput));
});
