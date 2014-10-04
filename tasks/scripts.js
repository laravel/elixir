var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Straw').config;

/*
 |--------------------------------------------------------------------------
 | Concatenate Scripts
 |--------------------------------------------------------------------------
 |
 | This task will concatenate and minify any JavaScript files in order.
 | This gives you a quick and easy way to reduce the number of
 | HTTP requests that your app makes.
 |
 */
gulp.task('scripts', function() {
    var saveTo = config.concatenate.js.to || config.jsOutput;
    var concatName = 'all.min.js';

    if (saveTo.indexOf('.js') > -1) {
        var pathFragments = saveTo.split('/');

        concatName = pathFragments.pop();
        saveTo = pathFragments.join('/');
    }

    return gulp.src(config.concatenate.js.source)
        .pipe(plugins.concat(concatName))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(saveTo));
});