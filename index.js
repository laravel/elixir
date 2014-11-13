var Elixir = function(recipe) {
    require('require-dir')('./ingredients');
    recipe(Elixir.config);
};

Elixir.config = require('./Config');
Elixir.config.setDefaultsFrom('elixir.json');

Elixir.extend = function(name, callback) {
    Elixir.config[name] = callback;
};

module.exports = Elixir;
