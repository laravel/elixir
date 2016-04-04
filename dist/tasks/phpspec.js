'use strict';

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

var _Tests = require('./shared/Tests.js');

var _Tests2 = _interopRequireDefault(_Tests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _laravelElixir2.default.config;

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

_laravelElixir2.default.extend('phpSpec', function (src, command) {
    (0, _Tests2.default)('PHPSpec', src || config.testing.phpSpec.path + '/**/*Spec.php', command || 'vendor/bin/phpspec run');
});