var Elixir = function(recipe) {
	recipe(Elixir.config);
	require('require-dir')('./ingredients');
};

Elixir.config = require('./Config');

Elixir.extend = function(name, task, callback) {
	Elixir.config[task || name] = callback;
};

module.exports = Elixir;
