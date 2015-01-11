var notify = require('gulp-notify');

module.exports = function() {

    this.title = 'Laravel Elixir';

    this.message = function(subtitle) {
        return notify({
            title: this.title,
            subtitle: subtitle,
            icon: __dirname + '/../../icons/laravel.png',
            message: ' '
        });
    };

    this.error = function(e, subtitle) {
        return notify.onError({
            title: this.title,
            subtitle: subtitle,
            message:  'Error: <%= error.message %>',
            icon: __dirname + '/../../icons/fail.png'
        })(e);
    };

    this.forPassedTests = function(framework) {
        return notify({
            title: 'Green!',
            subtitle: 'Your ' + framework + ' tests passed!',
            icon: __dirname + '/../../icons/pass.png',
            message: ' '
        });
    };

    this.forFailedTests = function(e, framework) {
        return notify.onError({
            title: 'Red!',
            subtitle: 'Your ' + framework + ' tests failed!',
            icon: __dirname + '/../../icons/fail.png',
            message: ' '
        })(e);
    };

};
