var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var filter = require('gulp-filter');
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
        gulp.src(mainBowerFiles(), { base: bowerDir })
            .pipe(filter('**/*.css'))
                .pipe(gulp.dest(config.cssOutput + '/vendor'))
                .pipe(cssFilter.restore())
            .pipe(filter('**/*.js'))
                .pipe(gulp.dest(config.jsOutput + '/vendor'));
    });

    this.bowerDir = bowerDir;

    return this.queueTask('publish');

});

