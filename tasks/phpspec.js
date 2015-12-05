var Elixir = require('laravel-elixir');
var runTests = require('./shared/Tests');

var config = Elixir.config;

/*
 |----------------------------------------------------------------
 | PHPSpec Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPSpec test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It's works great with the tdd task.
 |
 */

Elixir.extend('phpSpec', function(src, options) {
    runTests({
        name: 'phpSpec',
        src: src || (config.testing.phpSpec.path + '/**/*Spec.php'),
        plugin: Elixir.Plugins.phpspec,
        pluginOptions: options || config.testing.phpSpec.options
    });
});
