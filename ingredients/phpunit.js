var gulp = require('gulp');
var config = require('../Elixir').config;
var plugins = require('gulp-load-plugins')();
var phpunitConfig = config.testSuites.phpunit;

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

gulp.task('phpunit', function() {
    var options =  { debug: true, notify: true, clear: true };

    gulp.src(phpunitConfig.src + phpunitConfig.search)
        .pipe(plugins.phpunit('', options)).on('error', plugins.notify.onError({
            title: 'Red!',
            message: 'Your PHPUnit tests failed!',
            icon: __dirname + '/../icons/fail.png'
        }))
        .pipe(plugins.notify({
            title: 'Green!',
            message: 'Your PHPUnit tests passed!',
            icon: __dirname + '/../icons/pass.png'
        }));
});
