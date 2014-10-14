var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var plugins = require('gulp-load-plugins')();

/*
 |----------------------------------------------------------------
 | Less Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Less, including minification and
 | and auto-prefixing. Less is one of the CSS pre-processors
 | supported by Elixir, along with the Sass CSS processor.
 |
 */

elixir.extend('less', function(src, output) {

    var baseDir = this.preprocessors.baseDir + 'less';

    src = this.buildGulpSrc(src, baseDir, '**/*.less');

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

        return gulp.src(src)
            .pipe(plugins.less()).on('error', onError)
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(config.production, plugins.minifyCss()))
            .pipe(gulp.dest(output || config.cssOutput))
            .pipe(plugins.notify({
                title: 'Laravel Elixir',
                subtitle: 'Less Compiled!',
                icon: __dirname + '/../icons/laravel.png',
                message: ' '
            }));
    });

    this.registerWatcher('less', baseDir + '/**/*.less');

    return this.queueTask('less');

});