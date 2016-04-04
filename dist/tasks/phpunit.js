'use strict';

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

var _Tests = require('./shared/Tests');

var _Tests2 = _interopRequireDefault(_Tests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _laravelElixir2.default.config;

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

_laravelElixir2.default.extend('phpUnit', function (src, command) {
    (0, _Tests2.default)('PHPUnit', src || config.testing.phpUnit.path + '/**/*Test.php', command || 'vendor/bin/phpunit --verbose');
});