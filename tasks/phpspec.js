var gulp   = require('gulp');
var Elixir = require('laravel-elixir');

var config = Elixir.config;
var notify = new Elixir.Notification();

/*
 |----------------------------------------------------------------
 | PHPUnit Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPUnit test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It works great with your tdd task.
 |
 */

Elixir.extend('phpSpec', function(src, command) {
    src = src || (config.testing.phpSpec.path + '/**/*Spec.php'),
    command = command || 'vendor/bin/phpspec run';

    new Elixir.Task('phpSpec', function(error) {
        Elixir.Log.heading('Triggering PHPSpec: ' + command);

        return (
            gulp
            .src('')
            .pipe(Elixir.Plugins.shell(command))
            .on('error', function(e) {
                notify.forFailedTests(e, 'PHPSpec');

                this.emit('end');
            })
            .pipe(notify.forPassedTests('PHPSpec'))
        );
    })
    .watch(src);
});

