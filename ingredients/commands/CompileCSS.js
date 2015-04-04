var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('laravel-elixir').config;
var utilities = require('./Utilities');
var Notification = require('./Notification');
var merge = require('merge-stream');

/**
 * Display a compilation error notification.
 *
 * @param {object} e
 */
var onError = function(e) {
    new Notification().error(e, options.compiler + ' Compilation Failed!');

    this.emit('end');
};


/**
 * Trigger Sass compilation.
 *
 * @param {mixed}  src
 * @param {object} options
 */
var triggerSass = function(src, options) {
    var toMaps = plugins.if(config.sourcemaps, plugins.sourcemaps.init());

    if (options.plugin == 'gulp-ruby-sass') {
        return require('gulp-ruby-sass')(src, options.pluginOptions).pipe(toMaps);
    }

    return gulp.src(src).pipe(toMaps).pipe(
        plugins[options.plugin](options.pluginOptions)
    );
};


/**
 * Build the Gulp task.
 *
 * @param {string} name
 * @param {string} watchPath
 */
var buildTask = function(name, watchPath) {
    gulp.task(name, function() {
        return merge.apply(this, config.compile[name].map(function(compile) {
            var src = compile.src;
            var options = compile.options;

            utilities.logTask("Running " + options.compiler, src);

            return triggerSass(src, options).on('error', onError)
                .pipe(plugins.autoprefixer())
                .pipe(plugins.if(config.production, plugins.minifyCss()))
                .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
                .pipe(gulp.dest(options.output || config.cssOutput))
                .pipe(new Notification().message(options.compiler + ' Compiled!'));
        }));
    });

    return config
        .registerWatcher(name, watchPath)
        .queueTask(name);
}


module.exports = function(options) {
    var name = options.compiler.toLowerCase();
    var dir = config.assetsDir + name;
    var src = utilities.buildGulpSrc(options.src, dir, options.search);
    var watchPath = dir + '/' + options.search;

    src.forEach(function(src) {
        config.compile[name] = config.compile[name] || [];

        config.compile[name].push({ src: src, options: options });
    });

    return buildTask(name, watchPath);
};