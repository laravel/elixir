var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;
var srcPaths = config.watchers.default();
var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));

gulp.task('watch', tasksToRun, function() {
    tasksToRun.forEach(function(task) {
        gulp.watch(srcPaths[task], [task])
    });
});
