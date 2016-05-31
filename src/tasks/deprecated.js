/**
 * Deprecated.
 */
Elixir.extend('babel', function() {
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
Elixir.extend('browserify', function() {
    new Elixir.Task('browserify', function() {
        Elixir.log
            .heading('Compatibility Alert!')
            .heading(
                `'mix.browserify()' was extracted to its own extension in
                Laravel Elixir 6.0. Instead, either opt for 'mix.scripts()' -
                which leverages Webpack - or install 'laravel-elixir-browserify-official'
                like this: http://bit.ly/1UrRC87`.replace(/\s{2,}/g, "\n")
            );
    })
});
