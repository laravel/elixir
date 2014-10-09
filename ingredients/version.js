var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;
var plugins = require('gulp-load-plugins')();

var mustRunFirst = _.intersection(config.tasks, [
    'less', 'sass', 'coffee', 'styles', 'scripts'
]);

/*
 |----------------------------------------------------------------
 | Versioning / Cache Busting
 |----------------------------------------------------------------
 |
 | This task will append a small hash on the end of your file
 | and generate a manifest file which contains the current
 | "version" of the filename for the application to use.
 |
 */

gulp.task('version', mustRunFirst, function() {
    gulp.src(config.versioning.baseDir + '/*' , { read: false })
        .pipe(plugins.clean({ force: true }));

    gulp.src(config.versioning.src)
        .pipe(plugins.rev())
        .pipe(gulp.dest(config.versioning.baseDir))
        .pipe(plugins.rev.manifest())
        .pipe(gulp.dest(config.versioning.baseDir));
});
