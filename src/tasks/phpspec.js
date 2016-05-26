import TestingTask from '../TestingTask';

/*
 |----------------------------------------------------------------
 | PHPSpec Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPSpec test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It works great with your tdd task.
 |
 */

Elixir.extend('phpSpec', function(src, command) {
    new TestingTask('phpSpec', src, command);
});
