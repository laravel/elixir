var gulp = require('gulp');
var _ = require('underscore');
var Elixir = require('../index');


gulp.task('watch', function() {
    var tasks = _.sortBy(Elixir.tasks, 'name');

    if (_.contains(_.pluck(tasks, 'name'), 'browserify')) {
        Elixir.config.js.browserify.watchify = true;

        gulp.start('browserify');
    }

    tasks
        .filter(function(task, index) {
            if ( ! task.watch || (task.category != 'default')) {
                return false;
            }

            if (index > 0) {
                return task.name !== tasks[index - 1].name;
            }

            return true;
        })
        .forEach(function(task) {
            gulp.watch(task.watchers, [task.name]);
        });
});
