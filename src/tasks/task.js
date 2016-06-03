import map from 'vinyl-map';
import minifier from './utilities/minifier';

class Task {

    /**
     * Create a new Task instance.
     *
     * @param {string}    name
     * @param {Function}  description
     * @param {GulpPaths} paths
     */
    constructor(name, description, paths) {
        this.name = name;
        this.watchers = [];
        this.isComplete = false;
        this.steps = [];

        if (paths) {
            this.paths = paths;
            this.src = this.paths.src;
            this.output = this.paths.output;
        }

        this.describe(this.gulpTask || description);
    }


    /**
     * Get the "ucwords" version of the task name.
     *
     * @return {string}
     */
    ucName() {
        return this.name.substr(0,1).toUpperCase() +
               this.name.substr(1);
    }


    /**
     * Describe the task. This is the Gulp definition.
     *
     * @param  {Function} definition
     * @return {Task}
     */
    describe(definition) {
        this.definition = definition;

        return this.register();
    }


    /**
     * Set the task to be called, when firing `Gulp`.
     *
     * @return {Task}
     */
    register() {
        Elixir.tasks.push(this);

        return this;
    }


    /**
     * Set a path regex to watch for changes.
     *
     * @param  {string} regex
     * @param  {string} category
     * @return {Task}
     */
    watch(regex, category = 'default') {
        if (regex) {
            this.watchers = this.watchers.concat(regex);
        }

        this.category = category;

        return this;
    }


    /**
     * Determine if the task has any watchers.
     *
     * @return {Boolean}
     */
    hasWatchers() {
        return this.watchers.length > 0;
    }


    /**
     * Exclude the given path from the watcher.
     *
     * @param  {string} path
     * @return {Task}
     */
    ignore(path) {
        this.watchers.push(('!./' + path).replace('././', './'));

        return this;
    }


    /**
     * Execute the task definition.
     *
     * @return {function}
     */
    run() {
        this.registerWatchers && this.registerWatchers();

        let definition = this.definition(Elixir.Plugins, Elixir.config);

        this.isComplete = true;

        this.log();

        return definition;
    }


    /**
     * An ordered list of the actions that occurred for the task.
     *
     * @return {string}
     */
    summary() {
        return this.steps.map(
            (step, index) => `${++index}. ${step}`
        ).join('\n');
    }


    /**
     * Initialize the sourcemaps.
     */
    initSourceMaps() {
        if (! Elixir.config.sourcemaps) {
            return this.stream();
        }

        return Elixir.Plugins.sourcemaps.init();
    }


    /**
     * Write to the sourcemaps file.
     */
    writeSourceMaps() {
        if (! Elixir.config.sourcemaps) {
            return this.stream();
        }

        this.recordStep('Writing Source Maps');

        return Elixir.Plugins.sourcemaps.write('.');

    }


    /**
     * Apply CSS auto-prefixing.
     */
    autoPrefix() {
        if (! Elixir.config.css.autoprefix.enabled) {
            return this.stream();
        }

        this.recordStep('Autoprefixing CSS');

        return Elixir.Plugins.autoprefixer(
            Elixir.config.css.autoprefix.options
        );
    }


    /**
     * Minify the relevant CSS or JS files.
     */
    minify() {
        if (! Elixir.inProduction) {
            return this.stream();
        }

        this.recordStep('Applying Minification');

        return minifier(this.output);
    }


    /**
     * Apply concatenation to the incoming stream.
     */
    concat() {
        this.recordStep('Concatenating Files');

        return Elixir.Plugins.concat(this.output.name);
    }


    /**
     * Set the destination path.
     *
     * @param {object} gulp
     */
    saveAs(gulp) {
        this.recordStep('Saving to Destination');

        return gulp.dest(this.output.baseDir);
    }


    /**
     * Handle successful compilation.
     *
     * @param {string|null} message
     */
    onSuccess(message = null) {
        message = message || `${this.ucName()} Compiled!`;

        return new Elixir.Notification(message);
    }


    /**
     * Handle a compilation error.
     *
     * @return {function}
     */
    onError() {
        let task = this.ucName();

        return function (e) {
            new Elixir.Notification().error(
                e, `${task} Compilation Failed!`
            );

            this.emit('end');
        };
    }


    /**
     * Log the task input and output.
     *
     * @param {string|null} message
     */
    log(message = null) {
        if (message) {
            return Elixir.log.status(message);
        }

        // As long as we're not triggering the entire
        // suite, we can log the stats for this task.
        if (! Elixir.isRunningAllTasks) {
            Elixir.log.task(this);
        }
    }


    /**
     * Record a step to the summary list.
     *
     * @param {string} message
     */
    recordStep(message) {
        this.steps.push(message);
    }


    /**
     * Get a generic stream to return.
     */
    stream() {
        return map(function () {});
    }
}


export default Task;
