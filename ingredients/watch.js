var gulp       = require('gulp');
var config     = require('laravel-elixir').config;
var inSequence = require('run-sequence');
var _          = require('underscore');

var srcPaths;
var tasksToRun;

gulp.task('watch', function() {
    srcPaths = config.watchers.default;
    tasksToRun = _.intersection(config.tasks, _.keys(srcPaths).concat('copy'));

    if (_.contains(tasksToRun, 'browserify')) {
        config.watchify = true;
    }

    inSequence.apply(this, tasksToRun.concat('watch-assets'));
});

gulp.task('watch-assets', function() {
    for (var task in srcPaths) {
        if (_.isFunction(srcPaths[task])) {
            srcPaths[task].apply(this);
        } else {
            gulp.watch(srcPaths[task], [task]);
        }
    }
});
