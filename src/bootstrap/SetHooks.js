/**
 * All available Elixir event hooks.
 *
 * @type {Object}
 */
Elixir.hooks   = { before: [], watch: [] };


/**
 * Register an event handler for 'gulp watch' is executed.
 *
 * @param {function} func
 */
Elixir.onWatch = func => Elixir.hooks.watch.push(func);


/**
 * Register an event handler for before all Gulp tasks run.
 *
 * @param {function} func
 */
Elixir.before  = func => Elixir.hooks.before.push(func);
