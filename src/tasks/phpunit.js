import TestingTask from '../TestingTask';
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
    new TestingTask('phpUnit', src, command);
});
