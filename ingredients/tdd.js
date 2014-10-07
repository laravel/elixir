var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;
var srcPaths = config.watchers.tdd();
var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));


/*
 |--------------------------------------------------------------------------
 | Tests Watcher
 |--------------------------------------------------------------------------
 |
 | This task sets up a watcher for your tests, as well as your app's PHP
 | files. When changed, your test suite will automatically fire.
 |
 */
gulp.task('tdd', tasksToRun, function() {
    tasksToRun.forEach(function(task) {
        gulp.watch(srcPaths[task], [task]);
    });

    gulp.watch('app/**/*.php', tasksToRun);
});