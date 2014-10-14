var gulp = require('gulp');
var tasksToRun = require('laravel-elixir').config.tasks;

/*
 |----------------------------------------------------------------
 | Default Task
 |----------------------------------------------------------------
 |
 | This task will run when the developer executes "gulp" on the
 | command line. We'll use this configuration object to know
 | which tasks should be fired when this task is executed.
 |
 */

gulp.task('default', tasksToRun);
