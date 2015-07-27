var gulp   = require('gulp');
var Elixir = require('../../index');

var $ = Elixir.Plugins;
var config = Elixir.config;


module.exports = function(options) {
    var name = options.name;

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
        .pipe($.if(config.production, $.minifyCss()))
        .pipe($.if(config.sourcemaps, $.sourcemaps.write('.')))
        .pipe(gulp.dest(options.output.baseDir))
        .pipe(new Elixir.Notification(name + ' Compiled!'))
    );
};
