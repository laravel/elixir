var gulp = require('gulp');
var Elixir = require('laravel-elixir');


/*
 |----------------------------------------------------------------
 | Custom Gulp Tasks
 |----------------------------------------------------------------
 |
 | Sometimes, you'll want to hook your custom Gulp tasks into
 | Elixir. Simple! Simply call Elixir's task() method, and
 | provide the name of your task, and a regex to watch.
 |
 */

Elixir.extend('task', function(name, watcher) {
    var task = new Elixir.Task('task', function() {
        return gulp.start(name);
    });

    if (watcher) {
        task.watch(watcher);
    }
});
