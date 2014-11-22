var gulp = require('gulp');
var elixir = require('laravel-elixir');
var filter = require('gulp-filter');
var config = elixir.config;
var mainBowerFiles = require('main-bower-files');

/*
 |----------------------------------------------------------------
 | Gulp Bower Compilation
 |----------------------------------------------------------------
 |
 | This task will search for any relevant Bower dependencies, and
 | copy them to the correct directories for your Laravel app.
 |
 */

elixir.extend('publish', function(bowerDir) {

    gulp.task('publish', function() {
        var cssFilter = filter('**/*.css');
        var jsFilter = filter('**/*.js');

        gulp.src(mainBowerFiles(), { base: bowerDir })
            .pipe(cssFilter)
                .pipe(gulp.dest(config.cssOutput + '/vendor'))
                .pipe(cssFilter.restore())

            .pipe(jsFilter)
                .pipe(gulp.dest(config.jsOutput + '/vendor'));
    });

    this.bowerDir = bowerDir;

    return this.queueTask('publish');

});

