var fs = require('fs');
var _ = require('underscore');

/**
 * Elixir is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
var Elixir = function(recipe) {
    require('require-dir')('./tasks');

    // Load the user's Gulpfile recipe.
    recipe(Elixir.mixins);

    // And initialize their chosen tasks.
    Elixir.tasks.forEach(function(task) {
        task.toGulp();
    });
};

Elixir.mixins       = {};
Elixir.Log          = require('./Logger');
Elixir.Notification = require('./Notification');
Elixir.GulpPaths    = require('./GulpPaths');
Elixir.config       = config = require('./Config');
Elixir.Plugins      = require('gulp-load-plugins')();
Elixir.Task         = require('./Task')(Elixir);
Elixir.tasks        = new (require('./TaskCollection'))(config.tasks, Elixir);

/**
 * Register a new task with Elixir.
 *
 * @param {string}   name
 * @param {Function} callback
 */
Elixir.extend = function(name, callback) {
    Elixir.mixins[name] = function() {
        callback.apply(this, arguments);

        return this.mixins;
    }.bind(this);
};

/**
 * Allow for config overrides, via an elixir.json file.
 *
 * @param {string} file
 */
Elixir.setDefaultsFrom = function(file) {
    var overrides;

    if (fs.existsSync(file)) {
        overrides = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.mixin({
            deepExtend: require('underscore-deep-extend')(_)
        });

        _.deepExtend(Elixir.config, overrides);
    }
}('elixir.json');


module.exports = Elixir;
