var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Elixir').config;


/*
 |--------------------------------------------------------------------------
 | Concatenate Styles
 |--------------------------------------------------------------------------
 |
 | This task will concatenate and minify any CSS files in order.
 | This gives you a quick and easy way to reduce the number
 | of HTTP requests that your app makes.
 |
 */
gulp.task('styles', function() {
    var saveTo = config.concatenate.css.to || config.cssOutput;
    var concatName = 'all.min.css';

    if (saveTo.indexOf('.css') > -1) {
        var pathFragments = saveTo.split('/');

        concatName = pathFragments.pop();
        saveTo = pathFragments.join('/');
    }

    return gulp.src(config.concatenate.css.source)
        .pipe(plugins.concat(concatName))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(saveTo));
});