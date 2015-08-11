var notify = require('gulp-notify');
var config = require('laravel-elixir').config;


/**
 * Create a new Notification instance.
 */
var Notification = function() {
    this.title = 'Laravel Elixir';

    // If an argument is provided, then we'll
    // assume they want to show a message.
    if (arguments.length) {
        return this.message(arguments[0]);
    }
};

var n = Notification.prototype;


/**
 * Display a notification.
 *
 * @param {string} message
 */
n.message = function(message) {
    if ( ! config.notifications) return;

    return notify({
        title: this.title,
        message: message,
        icon: __dirname + '/icons/laravel.png',
        onLast: true
    });
};


/**
 * Display an error notification.
 *
 * @param {object} e
 * @param {string} message
 */
n.error = function(e, message) {
    if ( ! config.notifications) return;

    notify.onError({
        title: this.title,
        message: message + ': <%= error.message %>',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);

    // We'll spit out the error, just in
    // case it is useful for the user.
    console.log(e);
};


/**
 * Display a notification for passed tests.
 *
 * @param {string} framework
 */
n.forPassedTests = function(framework) {
    if ( ! config.notifications) return;

    return notify({
        title: 'Green!',
        message: 'Your ' + framework + ' tests passed!',
        icon: __dirname + '/icons/pass.png',
        onLast: true
    });
};


/**
 * Display a notification for failed tests.
 *
 * @param {object} e
 * @param {string} framework
 */
n.forFailedTests = function(e, framework) {
    if ( ! config.notifications) return;

    return notify.onError({
        title: 'Red!',
        message: 'Your ' + framework + ' tests failed!',
        icon: __dirname + '/icons/fail.png',
        onLast: true
    })(e);
};


module.exports = Notification;