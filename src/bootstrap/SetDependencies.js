import gutils from 'gulp-util';

Elixir.mixins       = {};
Elixir.isWatching   = () => gutils.env._.indexOf('watch') > -1;
Elixir.log          = new (require('../Logger').default)();
Elixir.fail         = message => Elixir.log.error(message) && process.exit(1);
Elixir.GulpPaths    = require('../GulpPaths').default;
Elixir.config       = require('../Config').default;
Elixir.Plugins      = require('gulp-load-plugins')();
Elixir.Task         = require('../Task').default;
Elixir.tasks        = new (require('../TaskCollection').default)();
