var notify = require('gulp-notify');

module.exports = function() {

    this.title = 'Laravel Elixir';

    this.message = function(message) {
        return notify({
            title: this.title,
            message: message,
            icon: __dirname + '/../../icons/laravel.png',
            onLast: true
        });
    };

    this.error = function(e, message) {
        notify.onError({
            title: this.title,
            message: message + ': <%= error.message %>',
            icon: __dirname + '/../../icons/fail.png'
        })(e);

        // We'll spit out the error, just in case it's useful
        // for the user.
        console.log(e);
    };

    this.forPassedTests = function(framework) {
        return notify({
            title: 'Green!',
            message: 'Your ' + framework + ' tests passed!',
            icon: __dirname + '/../../icons/pass.png',
            onLast: true
        });
    };

    this.forFailedTests = function(e, framework) {
        return notify.onError({
            title: 'Red!',
            message: 'Your ' + framework + ' tests failed!',
            icon: __dirname + '/../../icons/fail.png'
        })(e);
    };

};
