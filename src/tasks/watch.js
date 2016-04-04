import gulp from 'gulp';
import Elixir from 'laravel-elixir';

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

gulp.task('watch', function() {
    initBrowserify();

    Elixir.tasks.forEach(task => {
        const batchOptions = Elixir.config.batchOptions;

        if (task.hasWatchers()) {
            gulp.watch(task.watchers, { interval: 1000 }, batch(batchOptions, (events) => {
                events.on('end', gulp.start(task.name));
            }));
        }
    });
});

/**
 * Determine if Browserify is included in the list.
 */
const initBrowserify = function() {
    if (Elixir.tasks.has('browserify')) {
        Elixir.config.js.browserify.watchify.enabled = true;

        gulp.start('browserify');
    }
};
