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
    'routeScanning': config.scans.routes.baseDir + '/**/*Controller.php',
    'phpunit': phpunit.src + '/**/*Test.php',
    'phpspec': phpspec.src + '/**/*Spec.php'
};


var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));

gulp.task('tdd', tasksToRun, function() {
    _.each(tasksToRun, function(task) {
        gulp.watch(srcPaths[task], [task]);
    });

    gulp.watch('app/**/*.php', tasksToRun);
});
