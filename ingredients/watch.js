var gulp = require('gulp');
var _ = require('underscore');
var config = require('../Elixir').config;
var sass = config.preprocessors.sass;
var less = config.preprocessors.less;
var coffee = config.preprocessors.coffee;


/*
 |--------------------------------------------------------------------------
 | Assets Watcher
 |--------------------------------------------------------------------------
 |
 | This task sets up a watcher for your assets. When modified,
 | they will automatically be compiled down to CSS and JS.
 |
 */
var srcPaths = {
    'sass': sass.src + sass.search,
    'less': 'resources/assets/less/**/*.less',
    'coffee': coffee.src + coffee.search,
    'routeScanning': config.scans.routes.baseDir + '/**/*Controller.php',
    'eventScanning': config.scans.events.baseDir + '/**/*.php'
};

var tasksToRun = _.intersection(config.tasks, _.keys(srcPaths));

gulp.task('watch', tasksToRun, function() {
    _.each(tasksToRun, function(task) {
        gulp.watch(srcPaths[task], [task])
    });
});
