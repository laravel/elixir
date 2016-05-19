Elixir.hooks   = { before: [], watch: [] };
Elixir.onWatch = func => Elixir.hooks.watch.push(func);
Elixir.before  = func => Elixir.hooks.before.push(func);
