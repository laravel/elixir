var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Elixir').config;
var phpspecConfig = config.testSuites.phpspec;


/*
 |--------------------------------------------------------------------------
 | PHPSpec Testing
 |--------------------------------------------------------------------------
 |
 | This task will trigger your entire PHPSpec test suite, and then
 | display a notification, indicating the outcome.
 |
 */
gulp.task('phpspec', function() {
    var options = { 'verbose': 'v', notify: true, clear: true };

    gulp.src(phpspecConfig.src + phpspecConfig.search)
        .pipe(plugins.phpspec('', options))
            .on('error', plugins.notify.onError({
                title: 'Failure',
                message: 'Your PHPSpec tests have failed!'
            }))
        .pipe(plugins.notify({
            title: 'Success',
            message: 'All PHPSpec tests have passed!'
        }));
});