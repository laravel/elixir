import Compiler from './Compiler';

class TestingCompiler extends Compiler {
    /**
     * Create a new TestingCompiler instance.
     *
     * @param  {string|null} src
     * @param  {string|null} command
     */
    constructor(src, command) {
        super();

        this.src = src;
        this.command = command;
    }


    /**
     * Retrieve the full Gulp task.
     *
     * @param {Task} task
     */
    toGulp(task) {
        this.task = task;

        this.addWatchers();

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
    addWatchers() {
        this.task.watch(this.src || this.pluginConfig('path') + this.pluginConfig('search'))
            .watch(Elixir.config.appPath + '/**/*.php', 'tdd')
            .watch(Elixir.config.viewPath + '/**/*.php', 'tdd');
    }


    /**
     * Trigger the test suite.
     */
    runTests() {
        let command = this.command || this.pluginConfig('command');

        Elixir.log.status(`Running ${this.task.ucName()} (${command})`);

        return Elixir.Plugins.shell(command);
    }


    /**
     * Handle any errors.
     */
    onError() {
        let task = this.task.name;

        return function (e) {
            new Elixir.Notification().forFailedTests(e, task);

            this.emit('end');
        };
    }


    /**
     * Handle a "green" test suite.
     */
    onSuccess() {
        return new Elixir.Notification().forPassedTests(this.task.name);
    }


    /**
     * Retrieve the test suite configuration.
     *
     * @param {string} prop
     */
    pluginConfig(prop) {
        return Elixir.config.testing[this.task.name][prop];
    }
}


export default TestingCompiler;
