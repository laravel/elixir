var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('../Elixir').config;


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
    var getSrc = function() {
        var src = config.preprocessors.sass.src;

        var providedDirectSrc = function(src) {
            return src.match(/\.s[ac]ss$/) > -1;
        };

        return providedDirectSrc(src) ? src : src + '/**/*.+(scss|sass)';
    };

    return gulp.src(getSrc())
        .pipe(plugins.rubySass({ style: 'compressed' }))
            .on('error', function(err) {
                plugins.notify.onError({
                    title:    'Sass',
                    subtitle: 'Compilation Failed!',
                    message:  'Error: <%= error.message %>',
                    icon: __dirname + '/../icons/laravel.png'
                })(err);

                this.emit('end');
            })
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(config.preprocessors.sass.output))
        .pipe(plugins.notify({
            title: 'Sass',
            subtitle: 'Compiled!',
            message: ' ',
            icon: __dirname + '/../icons/laravel.png'
        }));
});