var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Straw').config;


/*
 |--------------------------------------------------------------------------
 | Sass Compilation
 |--------------------------------------------------------------------------
 |
 | This task will compile your Sass, auto-prefix it, minify it, and then
 | generate a manifest file, to help with automatic cache-busting.
 |
 */
gulp.task('sass', function() {
    var onError = function(err) {
        plugins.notify.onError({
            title:    'Sass',
            subtitle: 'Compilation Failed',
            message:  'Error: <%= error.message %>'
        })(err);

        this.emit('end');
    };

    return gulp.src(config.preprocessors.sass.src + '/**/*.+(scss|sass)')
        .pipe(plugins.rubySass({ style: 'compressed' })).on('error', onError)
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(config.preprocessors.sass.output))
        .pipe(plugins.notify({
            title: 'Sass',
            subtitle: 'Compiled!'
        }));
});