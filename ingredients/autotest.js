var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;
var phpunit = config.testSuites.phpunit;
var phpspec = config.testSuites.phpspec;


/*
 |--------------------------------------------------------------------------
 | Tests Watcher
 |--------------------------------------------------------------------------
 |
 | This task sets up a watcher for your tests, as well as your app's PHP
 | files. When changed, your test suite will automatically fire.
 |
 */
var srcPaths = {
    'phpunit': phpunit.src + '/**/*Test.php',
    'phpspec': phpspec.src + '/**/*Spec.php',
    'routeScanning': config.scans.routes.baseDir + '/**/*Controller.php'
};

var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));

gulp.task('autotest', tasksToRun, function() {
    _.each(tasksToRun, function(task) {
        gulp.watch(srcPaths[task], [task]);
    });

    gulp.watch('app/**/*.php', tasksToRun);
});
