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
    var sassConfig = config.preprocessors.sass;

    return gulp.src(sassConfig.src + sassConfig.search)
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