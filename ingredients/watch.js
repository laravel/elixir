var gulp = require('gulp');
var _ = require('underscore');
var config = require('laravel-elixir').config;

gulp.task('watch', function() {

    var srcPaths = config.watchers.default;
    var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));

    tasksToRun.forEach(function(task) {
        gulp.watch(srcPaths[task], [task])
    });

});

