import notify from 'gulp-notify';

class Notification {
    
    /**
     * Create a new Notification instance.
     */
    constructor() {
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
    message(message) {
        notify.logLevel(0);

        return notify({
            title: this.title,
            message: message,
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
    error(e, message) {
        notify.onError({
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
    forPassedTests(framework) {
        return notify({
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
    forFailedTests(e, framework) {
        return notify.onError({
            title: 'Red!',
            message: 'Your ' + framework + ' tests failed!',
            icon: __dirname + '/../icons/fail.png',
            onLast: true
        })(e);
    }
}


export default Notification;
