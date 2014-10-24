var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;

module.exports = function(options) {

    var src = config.buildGulpSrc(
        options.src, config.assetsDir + options.pluginName, options.search
    );

    gulp.task(options.pluginName, function() {
        return gulp.src(src)
            .pipe(plugins[options.pluginName](options.pluginOptions))
                .on('error', function(err) {
                    plugins.notify.onError({
                        title:    "Laravel Elixir",
                        subtitle: options.compiler + " Compilation Failed!",
                        message:  "Error: <%= error.message %>",
                        icon: __dirname + '/../../icons/fail.png'
                    })(err);

                this.emit('end');
            })
            .pipe(plugins.autoprefixer())
            .pipe(plugins.if(config.production, plugins.minifyCss()))
            .pipe(gulp.dest(options.output || config.cssOutput))
            .pipe(plugins.notify({
                title: 'Laravel Elixir',
                subtitle: options.compiler + ' Compiled!',
                icon: __dirname + '/../../icons/laravel.png',
                message: ' '
            }));
    });

    config.registerWatcher(
        options.pluginName,
        config.assetsDir + options.pluginName + '/' + options.search
    );

    return config.queueTask(options.pluginName);

};
