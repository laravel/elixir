var gulp = require('gulp');
var shell = require('gulp-shell');

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

gulp.task('eventScanning', function() {
    gulp.src('').pipe(shell('php artisan event:scan', {ignoreErrors: true}));
});
