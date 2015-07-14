var gulp = require('gulp');
var Elixir = require('../index');
var shell = require('gulp-shell');

Elixir.extend('speak', function(message) {
    // new Elixir.Task('speak')
    //     .describe(function() {
    //         return gulp.src('').pipe(shell('say ' + message));
    //     });

    new Elixir.Task('speak', function() {
        return gulp.src('').pipe(shell('say ' + message));
    });
});

// mix.speak('Hello World');