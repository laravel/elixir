var gulp = require('gulp');
var shell = require('gulp-shell');
var elixir = require('laravel-elixir');

/*
 |----------------------------------------------------------------
 | Event Scanner
 |----------------------------------------------------------------
 |
 | This task will automatically trigger the event:scan Artisan
 | command each time your app classes are modified. This is
 | a very easy way to keep the events updated on the fly.
 |
 */

elixir.extend('events', function() {

    gulp.task('eventScanning', function() {
        return gulp.src('').pipe(shell('php artisan event:scan', {ignoreErrors: true}));
    });

    this.registerWatcher('eventScanning', 'app/**/*.php');

    return this.queueTask('eventScanning');

});
