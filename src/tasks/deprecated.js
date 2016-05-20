/**
 * Deprecated.
 */
Elixir.extend('babel', function(scripts, output, baseDir, options) {
    new Elixir.Task('babel', function() {
        Elixir.log
            .heading('Compatibility Alert!')
            .heading(
                "'mix.babel()' was removed in Laravel Elixir 6.0. " +
                "You'll want to instead call 'mix.scripts().'"
            );
    })
});


/**
 * Deprecated.
 */
Elixir.extend('browserify', function(scripts, output, baseDir, options) {
    new Elixir.Task('browserify', function() {
        Elixir.log
            .heading('Compatibility Alert!')
            .heading(
                `'mix.browserify()' was extracted to its own extension in
                Laravel Elixir 6.0. You'll want to instead call 'mix.scripts().'
                Alternatively, install 'laravel-elixir-browserify'.`.replace(/\s{2,}/g, "\n")
            );
    })
});
