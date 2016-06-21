import map from 'vinyl-map';
import minifier from './utilities/minifier';

class Task {

    /**
     * Create a new Task instance.
     *
     * @param {string}    name
     * @param {Function}  gulpTask
     * @param {GulpPaths} paths
     */
    constructor(name, gulpTask, paths) {
        this.name = name;
        this.watchers = [];
        this.isComplete = false;
        this.steps = [];

        if (! this.gulpTask) {
            this.gulpTask = gulpTask;
        }

        if (paths) {
            this.paths = paths;
            this.src = this.paths.src;
            this.output = this.paths.output;
        }

        this.register();
    }


    /**
     * Set the task to be called, when firing `Gulp`.
     *
     * @return {Task}
     */
    register() {
        Elixir.tasks.push(this);

        this.registerWatchers && this.registerWatchers();

        return this;
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
     * Execute the task.
     *
     * @return {function}
     */
    run() {
        let stream = this.gulpTask(Elixir.Plugins, Elixir.config);

        this.isComplete = true;

        this.log();

        return stream;
    }


    /**
     * An ordered list of the actions that occurred for the task.
     *
     * @return {string}
     */
    summary() {
        let summary = this.steps.map(
            (step, index) => `${++index}. ${step}`
        ).join('\n');

        // Now that the summary has been prepared, we'll
        // clear out the steps for the next run-through.
        this.steps = [];

        return summary;
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
