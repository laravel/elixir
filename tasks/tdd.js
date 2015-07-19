var gulp = require('gulp');
var Elixir = require('laravel-elixir');


/*
 |----------------------------------------------------------------
 | TDD Watcher
 |----------------------------------------------------------------
 |
 | This task will keep an eye on any tasks that are part of the
 | tdd category. By default this includes PHPUnit and PHPSpec
 | tests. Run `gulp tdd` and your tests will auto-trigger.
 |
 */

gulp.task('tdd', function() {
    new Elixir.Log.message('Watching for tests...');

    Elixir.tasks
        .filter(function(task) {
            return task.category == 'tdd';
        })
        .forEach(function(task) {
            gulp.watch(task.watchers, [task.name]);
        });
});
