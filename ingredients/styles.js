var gulp = require('gulp');
var config = require('../Elixir').config;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | CSS File Concatenation
 |----------------------------------------------------------------
 |
 | This task will concatenate and minify your style sheet files
 | in order, which provides a quick and simple way to reduce
 | the number of HTTP requests your application fires off.
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
