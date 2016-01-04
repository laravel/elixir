var gulp    = require('gulp');
var Elixir = require('laravel-elixir');

/*
 |----------------------------------------------------------------
 | Execute
 |----------------------------------------------------------------
 |
 */

Elixir.extend('exec', function(command) {
    new Elixir.Task('exec', function() {
        return gulp.src('').pipe(Elixir.Plugins.shell(command));
    });
});

