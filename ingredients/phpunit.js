var elixir = require('laravel-elixir');
var _ = require('underscore');
var runTests = require('./commands/RunTests');

/*
 |----------------------------------------------------------------
 | PHPUnit Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPUnit test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It's works great with the tdd task.
 |
 */

elixir.extend('phpUnit', function(src, options) {

    options = _.extend({ debug: true, notify: true }, options);

    return runTests({
        framework: 'PHPUnit',
        pluginName: 'phpunit',
        pluginOptions: options,
        src: src || 'tests/**/*Test.php'
    });

});