/**
 * Load any official Elixir extensions, if
 * they have been installed by the user.
 */
function loadOfficialExtensions() {
    loadExtension('laravel-elixir-rollup-official');
    loadExtension('laravel-elixir-coffeescript');
    loadExtension('laravel-elixir-stylus');
    loadExtension('laravel-elixir-browserify-official');
    loadExtension('laravel-elixir-webpack-official');
    loadExtension('laravel-elixir-browsersync-official');

    require('require-dir')('../tasks/recipes');
};


/**
 * Load a single Elixir extension, while
 * suppressing any errors.
 *
 * @param  {string} name
 */
function loadExtension(name) {
    try { require(name); }
    catch (e) {}
}

loadOfficialExtensions();
