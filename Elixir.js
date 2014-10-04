/*
 |-----------------------------------------------------------------------
 | The Entry Point
 |-----------------------------------------------------------------------
 |
 | Elixir will be the entry point from the Gulpfile. When
 | called, we'll immediately trigger the user's Gulp
 | config settings.
 |
 */
var Elixir = function(recipe) {
    Elixir.brew(recipe);

    require('require-dir')('./ingredients');
};

Elixir.brew = function(recipe) {
    return recipe(Elixir.config);
};

Elixir.config = require('./Config');

module.exports = Elixir;