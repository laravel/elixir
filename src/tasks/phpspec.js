import Compiler from './compilers/TestingCompiler';

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
    new Elixir.Task('phpSpec', new Compiler(src, command));
});
