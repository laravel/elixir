var gulp = require('gulp');
var elixir = require('laravel-elixir');
var filter = require('gulp-filter');

/*
 |----------------------------------------------------------------
 | Gulp Bower Compilation
 |----------------------------------------------------------------
 |
 | This task will search for any relevant Bower dependencies, and
 | copy them to the correct directories for your Laravel app.
 |
 */

gulp.task('compile', function() {
    var cssFilter = filter('**/*.css');
    var sassFilter = filter('**/*.+(sass|scss)');
    var lessFilter = filter('**/*.less');
    var jsFilter = filter('**/*.js');
    var assetsDir = elixir.config.assetsDir;

    gulp.src('./bower_components/**/*')
        .pipe(cssFilter)
            .pipe(gulp.dest(assetsDir + 'css/vendor'))
            .pipe(cssFilter.restore())

        .pipe(sassFilter)
            .pipe(gulp.dest(assetsDir + 'sass/vendor'))
            .pipe(sassFilter.restore())

        .pipe(lessFilter)
            .pipe(gulp.dest(assetsDir + 'less/vendor'))
            .pipe(lessFilter.restore())

        .pipe(jsFilter)
            .pipe(gulp.dest('public/js/vendor'));
});


