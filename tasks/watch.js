var gulp = require('gulp');
var _ = require('underscore');
var straw = require('../Straw');
var config = straw.config;


/*
 |--------------------------------------------------------------------------
 | Assets Watcher
 |--------------------------------------------------------------------------
 |
 | This task sets up a watcher for your assets. When modified,
 | they will automatically be compiled down to CSS and JS.
 |
 */
var preprocessors = {
    'sass': config.preprocessors['sass'].src + '/**/*.+(scss|sass)',
    'less': config.preprocessors['less'].src + '/**/*.less',
    'coffee': config.preprocessors['coffee'].src + '/**/*.coffee'
};

var tasksToRun = _.intersection(straw.tasks, _.keys(preprocessors));

gulp.task('watch', tasksToRun, function() {
    _.each(tasksToRun, function(task) {
        gulp.watch(preprocessors[task], [task])
    });
});
