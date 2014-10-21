var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var _ = require('underscore');
var elixir = require('laravel-elixir');

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

elixir.extend('phpSpec', function(src, options) {

    src = src || 'spec/**/*Spec.php';
    options = _.extend({
        'verbose': 'v', notify: true, clear: true
    }, options);

    gulp.task('phpspec', function() {
        gulp.src(src)
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

    this.registerWatcher('phpspec', src, 'tdd');

    return this.queueTask('phpspec');

});


