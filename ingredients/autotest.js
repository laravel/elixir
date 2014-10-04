var gulp = require('gulp');
var _ = require('underscore');
var Elixir = require('../Elixir');
var config = Elixir.config;


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
    'phpunit': config.testSuites.phpunit.src + '/**/*Test.php',
    'phpspec': config.testSuites.phpspec.src + '/**/*Spec.php',
    'routeScanning': 'app/**/*Controller.php'
};

var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));

gulp.task('autotest', tasksToRun, function() {
    _.each(tasksToRun, function(task) {
        gulp.watch(srcPaths[task], [task]);
    });

    gulp.watch('app/**/*.php', tasksToRun);
});
