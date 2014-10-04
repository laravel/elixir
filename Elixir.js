var Elixir = function(recipe) {
    Elixir.brew(recipe);

    require('require-dir')('./ingredients');
};

Elixir.brew = function(recipe) {
    return recipe(Elixir.config);
};

Elixir.config = require('./Config');

module.exports = Elixir;