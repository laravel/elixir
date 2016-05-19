import runTests from './shared/Tests.js';

const config = Elixir.config;

/*
 |----------------------------------------------------------------
 | PHPSpec Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPUnit test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It works great with your tdd task.
 |
 */

Elixir.extend('phpSpec', function(src, command) {
    runTests(
        'PHPSpec',
        src || (config.testing.phpSpec.path + '/**/*Spec.php'),
        command || 'vendor/bin/phpspec run'
    );
});
