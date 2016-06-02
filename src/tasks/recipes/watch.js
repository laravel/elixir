const batch = Elixir.Plugins.batch;

/*
 |----------------------------------------------------------------
 | Watcher
 |----------------------------------------------------------------
 |
 | When you want to keep an eye on your files for changes, and
 | then re-trigger Gulp, then you should use the gulp watch
 | command. This way, you can auto-compile on each save!
 |
 */

gulp.task('watch', () => {
    Elixir.hooks.watch.forEach(hook => hook());

    runAllTasks();

    Elixir.tasks.forEach(task => {
        let batchOptions = Elixir.config.batchOptions;

        if (task.hasWatchers()) {
            gulp.watch(task.watchers, { interval: 1000 }, batch(batchOptions, events => {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});

/**
 * Trigger all registered tasks.
 */
function runAllTasks() {
    gulp.start('default');

    Elixir.isRunningAllTasks = false;
}
