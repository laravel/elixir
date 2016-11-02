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

gulp.task('watch', ['default'], () => {
    Elixir.hooks.watch.forEach(hook => hook());

    Elixir.tasks.forEach(task => {
        let batchOptions = Elixir.config.batchOptions;
        let watchOptions = Elixir.config.watch;

        if (task.hasWatchers()) {
            gulp.watch(task.watchers, watchOptions, batch(batchOptions, events => {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});
