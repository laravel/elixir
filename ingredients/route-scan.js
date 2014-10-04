var gulp = require('gulp');
var shell = require('gulp-shell');
var elixir = require('../Elixir');


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
    var baseDir = elixir.config.scans.routes.baseDir;

    gulp.src(baseDir + '/**/*Controller.php', {read: false})
        .pipe(shell('php artisan route:scan', {ignoreErrors: true}));
});