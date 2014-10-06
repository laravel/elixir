var gulp = require('gulp');
var shell = require('gulp-shell');


/*
 |--------------------------------------------------------------------------
 | Route Scanning
 |--------------------------------------------------------------------------
 |
 | If you use route annotations in your Laravel apps, this task
 | will automatically trigger 'artisan route:scan', when a
 | controller is saved.
 |
 */
gulp.task('routeScanning', function() {
    gulp.src('').pipe(shell('php artisan route:scan', {ignoreErrors: true}));
});