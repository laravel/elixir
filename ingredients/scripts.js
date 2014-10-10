var gulp = require('gulp');
var config = require('../Elixir').config;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | JavaScript File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your JavaScript files
 | in order. This provides a quick and simple way to reduce
 | the number of HTTP requests your application executes.
 |
 */

gulp.task('scripts', function() {
    var concatName = 'all.min.js';
    var saveTo = config.concatenate.js.to || config.jsOutput;

    if (saveTo.indexOf('.js') > -1) {
        var pathFragments = saveTo.split('/');

        concatName = pathFragments.pop();
        saveTo = pathFragments.join('/');
    }

    return gulp.src(config.concatenate.js.src)
        .pipe(plugins.concat(concatName))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(saveTo));
});
