class TestingTask extends Elixir.Task {
    /**
     * Create a new TestingTask instance.
     *
     * @param  {string}      name
     * @param  {string|null} src
     * @param  {string|null} command
     */
    constructor(name, src, command) {
        super(name);

        this.src = src;
        this.command = command;
    }


    /**
     * Build up the Gulp task.
     */
    gulpTask() {
        this.registerWatchers();

        return (
            gulp
            .src('')
            .pipe(this.runTests())
            .on('error', this.onError())
            .pipe(this.onSuccess())
        );
    }


    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src || this.pluginConfig('path') + this.pluginConfig('search'))
            .watch(Elixir.config.appPath + '/**/*.php', 'tdd')
            .watch(Elixir.config.viewPath + '/**/*.php', 'tdd');
    }


    /**
     * Trigger the test suite.
     */
    runTests() {
        let command = this.command || this.pluginConfig('command');

        this.log(`Running ${this.ucName()} (${command})`);

        return Elixir.Plugins.shell(command);
    }


    /**
     * Handle any errors.
     */
    onError() {
        let task = this.name;

        return function (e) {
            new Elixir.Notification().forFailedTests(e, task);

            this.emit('end');
        };
    }


    /**
     * Handle a "green" test suite.
     */
    onSuccess() {
        return new Elixir.Notification().forPassedTests(this.name);
    }


    /**
     * Retrieve the test suite configuration.
     *
     * @param {string} prop
     */
    pluginConfig(prop) {
        return Elixir.config.testing[this.name][prop];
    }
}


export default TestingTask;
