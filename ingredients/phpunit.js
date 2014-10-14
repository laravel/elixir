var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var elixir = require('laravel-elixir');
var config = elixir.config;

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

elixir.extend('phpUnit', function(src) {

    src = src || 'tests/**/*Test.php';

    gulp.task('phpunit', function() {
        var options = { debug: true, notify: true, clear: true };

        gulp.src(src)
            .pipe(plugins.phpunit('', options))
            .on('error', plugins.notify.onError({
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

    this.registerWatcher('phpunit', src, 'tdd');

    return this.queueTask('phpunit');

});
