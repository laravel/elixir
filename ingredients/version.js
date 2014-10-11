var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;
var rev = require('gulp-rev');
var del = require('del');

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
    var buildDir = config.versioning.buildDir;

    del(buildDir + '/*', { force: true })

    gulp.src(config.versioning.src, {base: "public"})
        .pipe(gulp.dest(buildDir))
        .pipe(rev())
        .pipe(gulp.dest(buildDir))
        .pipe(rev.manifest())
        .pipe(gulp.dest(buildDir));
});
