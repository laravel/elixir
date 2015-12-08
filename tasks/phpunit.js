var Elixir = require('laravel-elixir');
var runTests = require('./shared/Tests');

var config = Elixir.config;

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

Elixir.extend('phpUnit', function(src, options) {
    runTests({
        name: 'phpUnit',
        src: src || (config.testing.phpUnit.path + '/**/*Test.php'),
        plugin: Elixir.Plugins.phpunit,
        pluginOptions: options || config.testing.phpUnit.options
    });
});
