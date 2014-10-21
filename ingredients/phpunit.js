var elixir = require('laravel-elixir');
var _ = require('underscore');
var gulpTester = require('./helpers/GulpTester');

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

    return gulpTester({
        framework: 'PHPUnit',
        pluginName: 'phpunit',
        pluginOptions: _.extend({ debug: true, notify: true }, options),
        src: src || 'tests/**/*Test.php'
    });

});