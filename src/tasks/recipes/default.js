import inSequence from 'run-sequence';

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

gulp.task('all', function (callback) {
    Elixir.isRunningAllTasks = true;

    Elixir.hooks.before.forEach(hook => hook());

    inSequence.apply(this, Elixir.tasks.names().concat(callback));
});


gulp.task('default', ['all'], function() {
    // Once all tasks have been triggered, we can
    // render a pretty table for reporting.
    Elixir.log.tasks();

    Elixir.isRunningAllTasks = false;
});
