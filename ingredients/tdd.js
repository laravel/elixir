var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;

var srcPaths = config.watchers.tdd();
var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));

/*
 |----------------------------------------------------------------
 | Automated Testing
 |----------------------------------------------------------------
 |
 | This task will setup a watcher to run your automated tests on
 | every file change you make. You will get notified of the
 | result of the test suite each time tests are executed.
 |
 */

gulp.task('tdd', tasksToRun, function() {

    tasksToRun.forEach(function(task) {
        gulp.watch(srcPaths[task], [task]);
    });

    gulp.watch('app/**/*.php', tasksToRun);
});
