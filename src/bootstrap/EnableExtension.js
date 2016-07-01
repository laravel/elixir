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


/**
 * Register an external dependency install instruction.
 *
 * @param  {string} name
 * @param  {string} command
 */
Elixir.registerInstallInstruction = function (name, command) {
    Elixir.extend(name, function () {
        new Elixir.Task(name, function() {
            Elixir.log
                .error('Installation Required')
                .error(`To use "mix.${name}()", please run the following command, and then trigger gulp again.`)
                .command(command);
        });
    });
};
