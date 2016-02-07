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

Elixir.extend('phpUnit', function(src, command) {
    src = src || (config.testing.phpUnit.path + '/**/*Test.php');
    command = command || 'vendor/bin/phpunit --verbose';

    new Elixir.Task('phpUnit', function(error) {
        Elixir.Log.heading('Triggering PHPUnit: ' + command);

        return (
            gulp
            .src('')
            .pipe(Elixir.Plugins.shell(command))
            .on('error', function(e) {
                notify.forFailedTests(e, 'PHPUnit');

                this.emit('end');
            })
            .pipe(notify.forPassedTests('PHPUnit'))
        );
    })
    .watch(src);
});

