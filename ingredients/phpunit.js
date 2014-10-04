var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Elixir').config;


/*
 |--------------------------------------------------------------------------
 | PHPUnit Testing
 |--------------------------------------------------------------------------
 |
 | This task will trigger your entire PHPUnit test suite, and then
 | display a notification, indicating the outcome.
 |
 */
gulp.task('phpunit', function() {
    var options =  { debug: true, notify: true, clear: true };

    gulp.src(config.testSuites.phpunit.src + '/**/*Test.php')
        .pipe(plugins.phpunit('', options)).on('error', plugins.notify.onError({
            title: 'Failure',
            message: 'Your PHPUnit tests have failed!',
            icon: __dirname + '/../icons/fail.png'
        }))
        .pipe(plugins.notify({
            title: 'Success',
            message: 'All PHPUnit tests have passed!',
            icon: __dirname + '/../icons/pass.png'
        }));
});