var gulp = require('gulp');
var config = require('../Elixir').config;
var plugins = require('gulp-load-plugins')();
var phpspecConfig = config.testSuites.phpspec;

/*
 |----------------------------------------------------------------
 | PHPSpec Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire PHPSpec test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It's works great with the tdd task.
 |
 */

gulp.task('phpspec', function() {
    var options = { 'verbose': 'v', notify: true, clear: true };

    gulp.src(phpspecConfig.src + phpspecConfig.search)
        .pipe(plugins.phpspec('', options))
            .on('error', plugins.notify.onError({
                title: 'Red!',
                message: 'Your PHPSpec tests failed!',
                icon: __dirname + '/../icons/fail.png'
            }))
        .pipe(plugins.notify({
            title: 'Green!',
            message: 'Your PHPSpec tests passed!',
            icon: __dirname + '/../icons/pass.png'
        }));
});
