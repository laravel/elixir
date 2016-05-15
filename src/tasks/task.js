import Elixir from 'laravel-elixir';

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

Elixir.extend('task', (name, watcher) => {
    const task = new Elixir.Task('task', gulp => gulp.start(name));

    watcher && task.watch(watcher);
});
