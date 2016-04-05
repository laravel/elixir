import fs from 'fs';
import _ from 'underscore';

/**
 * Elixir is a wrapper around Gulp.
 *
 * @param {Function} recipe
 */
const Elixir = function(recipe) {
    // Perform any last-minute initializations.
    init();

    // Load all of Elixir's task definitions.
    require('require-dir')('./tasks');

    // Load the user's Gulpfile recipe.
    recipe(Elixir.mixins);

    // And run their chosen tasks.
    Elixir.tasks.forEach(task => task.toGulp());
};

Elixir.mixins       = {};
Elixir.Log          = require('./Logger').default;
Elixir.GulpPaths    = require('./GulpPaths').default;
Elixir.config       = require('./Config').default;
Elixir.Plugins      = require('gulp-load-plugins')();
Elixir.Task         = require('./Task').default(Elixir);
Elixir.tasks        = new (require('./TaskCollection').default)();

/**
 * Perform any last-minute initializations.
 */
const init = function () {
    if (! Elixir.config.notifications) {
        process.env.DISABLE_NOTIFIER = true;
    }

    Elixir.Notification = require('./Notification').default;
};

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
    let overrides;

    if (fs.existsSync(file)) {
        overrides = JSON.parse(fs.readFileSync(file, 'utf8'));

        _.mixin({
            deepExtend: require('underscore-deep-extend')(_)
        });

        _.deepExtend(Elixir.config, overrides);
    }
}('elixir.json');

module.exports = Elixir;
