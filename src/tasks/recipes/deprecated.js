/**
 * Deprecated.
 */
Elixir.extend('babel', function() {
    new Elixir.Task('babel', function() {
        Elixir.log
            .heading('Compatibility Alert!')
            .heading(
                "'mix.babel()' was removed in Laravel Elixir 6.0. " +
                "You'll want to instead call 'mix.webpack().'"
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
                Laravel Elixir 6.0. Instead, either opt for 'mix.webpack()' -
                which leverages Webpack - or install 'laravel-elixir-browserify-official'
                like this: http://bit.ly/1UrRC87`.replace(/\s{2,}/g, "\n")
            );
    })
});


/**
 * Deprecated.
 */
Elixir.extend('coffee', function() {
    new Elixir.Task('coffee', function() {
        Elixir.log
            .heading('Compatibility Alert!')
            .heading(
                `'mix.coffee()' was extracted to its own extension in
                Laravel Elixir 6.0. If your app requires CoffeeScript support,
                install 'laravel-elixir-coffeescript', like this: http://bit.ly/24hNNFh`.replace(/\s{2,}/g, "\n")
            );
    })
});
