var Elixir = function(recipe) {
	recipe(Elixir.config);
	require('require-dir')('./ingredients');
};

Elixir.config = require('./Config');

Elixir.extend = function(name, callback) {
	Elixir.config[name] = callback;

	Elixir.config.tasks.push(name);
};

module.exports = Elixir;
