var gulp = require('gulp');
var elixir = require('laravel-elixir');
var config = elixir.config;
var plugins = require('gulp-load-plugins')();
var sass = require('gulp-sass');


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

elixir.extend('sass', function(src, output) {

    var baseDir = this.preprocessors.baseDir + 'sass';

    src = this.buildGulpSrc(src, baseDir, '**/*.+(sass|scss)');

    gulp.task('sass', function() {
        return gulp.src(src)
            .pipe(sass({ outputStyle: config.production ? 'compressed' : 'nested' }))
                .on('error', function(err) {
                    plugins.notify.onError({
                        title:    'Laravel Elixir',
                        subtitle: 'Sass Compilation Failed!',
                        message:  'Error: <%= error.message %>',
                        icon: __dirname + '/../icons/fail.png'
                    })(err);

                    this.emit('end');
                })
            .pipe(plugins.autoprefixer())
            .pipe(gulp.dest(output || config.cssOutput))
            .pipe(plugins.notify({
                title: 'Laravel Elixir',
                subtitle: 'Sass Compiled!',
                message: ' ',
                icon: __dirname + '/../icons/laravel.png'
            }));
    });

    this.registerWatcher('sass', baseDir + '/**/*.+(sass|scss)');

    return this.queueTask('sass');

});
