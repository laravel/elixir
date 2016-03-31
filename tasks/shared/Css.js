var gulp   = require('gulp');
var Elixir = require('../../index');

var $ = Elixir.Plugins;
var config = Elixir.config;
var map;
var CleanCSS;


module.exports = function(options) {
    var name = options.name;

    loadPlugins();

    options.task.log(options.src, options.output);

    return (
        gulp
        .src(options.src.path)
        .pipe($.if(config.sourcemaps, $.sourcemaps.init()))
        .pipe(options.compiler(options.pluginOptions))
        .on('error', function(e) {
            new Elixir.Notification().error(e, name + ' Compilation Failed');

            this.emit('end');
        })
        .pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)))
        .pipe($.concat(options.output.name))
        .pipe($.if(config.production, minify))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(options.output.baseDir))
        .pipe(new Elixir.Notification(name + ' Compiled!'))
    );
};


/**
 * Prepare the minifier instance.
 *
 * @param  {object} buff
 * @param  {string} filename
 * @return {CleanCSS}
 */
var minify = map(function (buff, filename) {
    return new CleanCSS(config.css.minifier.pluginOptions).minify(buff.toString()).styles;
});


/**
 * Load the required Gulp plugins on demand.
 */
var loadPlugins = function () {
    map = require('vinyl-map');
    CleanCSS = require('clean-css');
};
