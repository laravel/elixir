var gulp = require('gulp');
var _ = require('underscore');
var Elixir = require('laravel-elixir');


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
    var tasks = _.sortBy(Elixir.tasks, 'name');

    // Browserify uses a special watcher, so we'll
    // hook into that option, only for gulp watch.

    if (_.contains(_.pluck(tasks, 'name'), 'browserify')) {
    Elixir.config.js.browserify.watchify.enabled = true;

        gulp.start('browserify');
    }

    tasks
        .filter(function(task, index) {
            if ( ! task.watch || (task.category != 'default')) {
                return false;
            }

            if (index > 0) {
                return task.watchers !== tasks[index -1].watchers;
            }

            return true;
        })
        .forEach(function(task) {
            gulp.watch(task.watchers, [task.name]);
        });
});
