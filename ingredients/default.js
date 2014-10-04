var gulp = require('gulp');
var tasksToRun = require('../Elixir').config.tasks;


/*
 |--------------------------------------------------------------------------
 | The Default Runner
 |--------------------------------------------------------------------------
 |
 | This is the task that will fire when you simply run `gulp` from the
 | command line. We'll use the Straw.sip() call to determine which
 | tasks we need to run.
 |
 */
gulp.task('default', tasksToRun);