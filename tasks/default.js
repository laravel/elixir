var gulp = require('gulp');
var tasksToRun = require('../Straw').tasks;

if ( ! tasksToRun.length) {
    console.error('\033[31m You have not called any tasks in your Gulpfile.');
}

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