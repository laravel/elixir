var gulp = require('gulp');
var config = require('laravel-elixir').config;
var plugins = require('gulp-load-plugins')();

module.exports = function(options) {

    gulp.task(options.taskName, function() {
        var ext = '.' + options.extension;
        var assets = config.concatenate[options.extension];
        var stream;

        assets.forEach(function(set, index) {
            var fileName = set.concatName;

            // If we're dealing with multiple asset concats,
            // but the user didn't give us a filename to use
            // then we'll append the index to the filename
            // to prevent any possible collisions.
            if (assets.length !== 1 && fileName == 'all' + ext) {
                fileName = fileName.replace(ext, '-' + index + ext);
            }

            stream = gulp.src(set.src)
                .pipe(plugins.concat(fileName))
                .pipe(plugins.if(config.production, options.minifier.call(this)))
                .pipe(gulp.dest(set.to));
        });

        return stream;
    });

   return config.combine(
        options.extension, options.assets, options.baseDir,
        options.output, options.taskName
    );

};