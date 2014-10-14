var gulp = require('gulp');
var shell = require('gulp-shell');
var elixir = require('laravel-elixir');

/*
 |----------------------------------------------------------------
 | Route Scanner
 |----------------------------------------------------------------
 |
 | This task will automatically trigger the route:scan Artisan
 | command each time your controllers are modified. This is
 | a very easy way to keep the routes updated on the fly.
 |
 */

elixir.extend('routes', function() {

    gulp.task('routeScanning', function() {
        return gulp.src('').pipe(shell('php artisan route:scan', {ignoreErrors: true}));
    });

    this.registerWatcher('routeScanning', 'app/**/*Controller.php');

    return this.queueTask('routeScanning');

});