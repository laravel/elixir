var gulp = require('gulp');
var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | Less Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Less, including minification and
 | and auto-prefixing. Less is one of the CSS pre-precessors
 | supported by Elixir, along with the Sass CSS processor.
 |
 */

gulp.task('less', function() {
    var onError = function(err) {
        plugins.notify.onError({
            title:    "Laravel Elixir",
            subtitle: "Less Compilation Failed!",
            message:  "Error: <%= error.message %>",
            icon: __dirname + '/../icons/fail.png'
        })(err);

        this.emit('end');
    };

    return gulp.src(config.preprocessors.less.src)
        .pipe(plugins.less()).on('error', onError)
        .pipe(plugins.autoprefixer())
        .pipe(plugins.if(config.production, plugins.minifyCss()))
        .pipe(gulp.dest(config.preprocessors.less.output))
        .pipe(plugins.notify({
            title: 'Laravel Elixir',
            subtitle: 'Less Compiled!',
            icon: __dirname + '/../icons/laravel.png',
            message: ' '
        }));
});
