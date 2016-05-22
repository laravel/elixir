/**
 * All available Elixir event hooks.
 *
 * @type {Object}
 */
Elixir.hooks = { before: [], watch: [] };


/**
 * Register an event handler for 'gulp watch' is executed.
 *
 * @param {function} handler
 */
Elixir.onWatch = handler => Elixir.hooks.watch.push(handler);


/**
 * Register an event handler for before all Gulp tasks run.
 *
 * @param {function} handler
 */
Elixir.before = handler => Elixir.hooks.before.push(handler);
