var gulp = require('gulp');
var Elixir = require('../../index');

var notify = new Elixir.Notification();

module.exports = function(options) {
    new Elixir.Task(options.name, function() {
        this.log(options.src);

        return (
            gulp
            .src(options.src)
            .pipe(options.plugin('', options.pluginOptions))
            .on('error', function(e) {
                notify.forFailedTests(e, options.name);

                this.emit('end');
            })
            .pipe(notify.forPassedTests(options.name))
        );
    })
    .watch(options.src, 'tdd')
    .watch(Elixir.config.appPath + '/**/*.php', 'tdd')
    .watch(Elixir.config.viewPath +'/**/*.php', 'tdd')
};
