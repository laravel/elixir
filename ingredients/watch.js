var gulp = require('gulp');
var _ = require('underscore');
var config = require('laravel-elixir').config;
var inSequence = require('run-sequence');

var srcPaths;
var tasksToRun;

gulp.task('watch', function() {
    srcPaths = config.watchers.default;
    tasksToRun = _.intersection(config.tasks, _.keys(srcPaths).concat('copy'));

    inSequence.apply(this, tasksToRun.concat('watch-assets'));
});

gulp.task('watch-assets', function() {
    for (var task in srcPaths) {
        gulp.watch(srcPaths[task], [task]);
    }
});
