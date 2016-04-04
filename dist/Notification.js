'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gulpNotify = require('gulp-notify');

var _gulpNotify2 = _interopRequireDefault(_gulpNotify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notification = function () {

    /**
     * Create a new Notification instance.
     */

    function Notification() {
        _classCallCheck(this, Notification);

        this.title = 'Laravel Elixir';

        // If an argument is provided, then we'll
        // assume they want to show a message.
        if (arguments.length) {
            return this.message(arguments[0]);
        }
    }

    /**
     * Display a notification.
     *
     * @param {string} message
     */


    _createClass(Notification, [{
        key: 'message',
        value: function message(_message) {
            return (0, _gulpNotify2.default)({
                title: this.title,
                message: _message,
                icon: __dirname + '/../icons/laravel.png',
                onLast: true
            });
        }

        /**
         * Display an error notification.
         *
         * @param {object} e
         * @param {string} message
         */

    }, {
        key: 'error',
        value: function error(e, message) {
            _gulpNotify2.default.onError({
                title: this.title,
                message: message + ': <%= error.message %>',
                icon: __dirname + '/../icons/fail.png',
                onLast: true
            })(e);

            // We'll spit out the error, just in
            // case it is useful for the user.
            console.log(e);
        }

        /**
         * Display a notification for passed tests.
         *
         * @param {string} framework
         */

    }, {
        key: 'forPassedTests',
        value: function forPassedTests(framework) {
            return (0, _gulpNotify2.default)({
                title: 'Green!',
                message: 'Your ' + framework + ' tests passed!',
                icon: __dirname + '/../icons/pass.png',
                onLast: true
            });
        }

        /**
         * Display a notification for failed tests.
         *
         * @param {object} e
         * @param {string} framework
         */

    }, {
        key: 'forFailedTests',
        value: function forFailedTests(e, framework) {
            return _gulpNotify2.default.onError({
                title: 'Red!',
                message: 'Your ' + framework + ' tests failed!',
                icon: __dirname + '/../icons/fail.png',
                onLast: true
            })(e);
        }
    }]);

    return Notification;
}();

exports.default = Notification;