var elixir = require('laravel-elixir');

/*
 |----------------------------------------------------------------
 | Mixing Custom Gulp Tasks
 |----------------------------------------------------------------
 |
 | Sometimes, you'll want to hook your custom Gulp tasks into
 | Elixir. Easy! Simply call Elixir's task() method, and
 | provide the name of your task, and a regex to watch.
 |
 */

elixir.extend('task', function(taskName, watch) {
    if (watch) {
        this.registerWatcher(taskName, watch);
    }

    return this.queueTask(taskName);
});
