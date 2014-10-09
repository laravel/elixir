var gulp = require('gulp');
var config = require('../Elixir').config;
var sassConfig = config.preprocessors.sass;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | Sass Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Sass, including minification and
 | and auto-prefixing. Sass is one of the CSS pre-precessors
 | supported by Elixir, along with the Less CSS processor.
 |
 */

gulp.task('sass', function() {

    return gulp.src(config.preprocessors.baseDir + sassConfig.src + sassConfig.search)
        .pipe(plugins.rubySass({ style: 'compressed' }))
            .on('error', function(err) {
                plugins.notify.onError({
                    title:    'Laravel Elixir',
                    subtitle: 'Sass Compilation Failed!',
                    message:  'Error: <%= error.message %>',
                    icon: __dirname + '/../icons/laravel.png'
                })(err);

                this.emit('end');
            })
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(config.preprocessors.sass.output))
        .pipe(plugins.notify({
            title: 'Laravel Elixir',
            subtitle: 'Sass Compiled!',
            message: ' ',
            icon: __dirname + '/../icons/laravel.png'
        }));
});
