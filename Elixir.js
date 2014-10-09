var Elixir = function(recipe) {
	recipe(Elixir.config);
    require('require-dir')('./ingredients');
};

Elixir.config = require('./Config');

module.exports = Elixir;
