/**
 * Register a new task with Elixir.
 *
 * @param {string}   name
 * @param {Function} callback
 */
Elixir.extend = function (name, callback) {
    // If we've already registered a mixin of this name
    // we'll return early. This way, extensions can
    // override default behavior.
    if (this.mixins[name]) return;

    this.mixins[name] = function() {
        callback.apply(this, arguments);

        return this.mixins;
    }.bind(this);
};
