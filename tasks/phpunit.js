var gulp   = require('gulp');
var Elixir = require('laravel-elixir');

var config = Elixir.config;
var runTests = require('./shared/Tests.js');


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
    runTests(
        'PHPUnit',
        src || (config.testing.phpUnit.path + '/**/*Test.php'),
        command || 'vendor/bin/phpunit --verbose'
    );
});

