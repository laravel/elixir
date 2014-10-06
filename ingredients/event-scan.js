var gulp = require('gulp');
var shell = require('gulp-shell');
var elixir = require('../Elixir');


/*
 |--------------------------------------------------------------------------
 | Event Scanning
 |--------------------------------------------------------------------------
 |
 | This task will scan PHP classes for changes, and then regenerate
 | your event listeners cache file.
 |
 */
gulp.task('eventScanning', function() {
    var baseDir = elixir.config.scans.events.baseDir;

    gulp.src(baseDir + '/**/*.php', {read: false})
        .pipe(shell('php artisan event:scan', {ignoreErrors: true}));
});