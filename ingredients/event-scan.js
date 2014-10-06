var gulp = require('gulp');
var shell = require('gulp-shell');


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
    gulp.src('').pipe(shell('php artisan event:scan', {ignoreErrors: true}));
});