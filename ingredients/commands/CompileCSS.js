var config = require('laravel-elixir').config;
var Notification = require('./Notification');
var plugins = require('gulp-load-plugins')();
var utilities = require('./Utilities');
var merge = require('merge-stream');
var gulp = require('gulp');


/**
 * Trigger preprocessor compilation.
 *
 * @param {mixed}  src
 * @param {object} options
 */
var triggerCompiler = function(src, options) {
    var compiler = plugins[options.plugin];
    var pluginOptions = options.pluginOptions;
    var toMaps = plugins.if(
        config.sourcemaps, plugins.sourcemaps.init()
    );

    // If we're using the Ruby version of Sass, then we need to
    // trigger the Gulp task in a slightly different manner.

    if (options.plugin == 'gulp-ruby-sass') {
        var rubySass = require('gulp-ruby-sass')(src, pluginOptions);

        stream = rubySass.pipe(toMaps);
    } else {
        stream = gulp.src(src).pipe(toMaps).pipe(compiler(pluginOptions));
    }

    return stream.on('error', function(e) {
        var message = options.compiler + ' Compilation Failed!';

        new Notification().error(e, message);

        this.emit('end');
    });
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

            return triggerCompiler(src, options)
                .pipe(plugins.if(config.autoprefix, plugins.autoprefixer()))
                .pipe(plugins.if(config.production, plugins.minifyCss()))
                .pipe(plugins.if(config.sourcemaps, plugins.sourcemaps.write('.')))
                .pipe(gulp.dest(options.output || config.cssOutput))
                .pipe(new Notification().message(options.compiler + ' Compiled!'));
        }));
    });

    return config
        .registerWatcher(name, watchPath)
        .queueTask(name);
};


module.exports = function(options) {
    var name = options.compiler.toLowerCase();
    var dir = config.assetsDir + name;
    var src = utilities.buildGulpSrc(options.src, dir, options.search);
    var watchPath = dir + '/' + options.search;

    config.compile[name] = config.compile[name] || [];
    config.compile[name].push({ src: src, options: options });

    return buildTask(name, watchPath);
};