import _ from 'underscore';
import gutils from 'gulp-util';
import map from 'vinyl-map';
import minifier from '../utilities/minifier';

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

        if (paths) {
            this.paths = paths;
            this.src = this.paths.src;
            this.output = this.paths.output;
        }

        // If the user opted for a subclass that contains
        // a "gulpTask" method, we will then defer to
        // that for all Gulp-specific logic.
        if (typeof this.gulpTask == 'function') {
            this.describe(this.gulpTask);
        } else if (description) {
            this.describe(description);
        }
    }


    /**
     * Get the "ucwords" version of the task name.
     */
    ucName() {
        return this.name.substr(0,1).toUpperCase() + this.name.substr(1);
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
     * @param  {string}      regex
     * @param  {string|null} category
     * @return {Task}
     */
    watch(regex, category) {
        if (regex) {
            this.watchers = this.watchers.concat(regex);
        }

        this.category = category || 'default';

        return this;
    }


    /**
     * Determine if the task has any watchers.
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
     */
    run() {
        this.isComplete = true;

        this.log();

        if (typeof this.registerWatchers == 'function') {
            this.registerWatchers();
        }

        return this.definition(Elixir.Plugins, Elixir.config);
    }


    /**
     * Initialize the sourcemaps.
     */
    initSourceMaps() {
        if (Elixir.config.sourcemaps) {
            return Elixir.Plugins.sourcemaps.init();
        }

        return map(function () {});
    }


    /**
     * Write to the sourcemaps file.
     */
    writeSourceMaps() {
        if (Elixir.config.sourcemaps) {
            return Elixir.Plugins.sourcemaps.write('.');
        }

        return map(function () {});
    }


    /**
     * Apply CSS auto-prefixing.
     */
    autoPrefix() {
        if (Elixir.config.css.autoprefix.enabled) {
            return Elixir.Plugins.autoprefixer(
                Elixir.config.css.autoprefix.options
            )
        }

        return map(function () {});
    }


    /**
     * Minify the relevant CSS or JS files.
     */
    minify() {
        if (! Elixir.inProduction) {
            return map(function () {});
        }

        return minifier(this.output);
    }


    /**
     * Apply concatenation to the incoming stream.
     */
    concat() {
        return Elixir.Plugins.concat(this.output.name);
    }


    /**
     * Set the destination path.
     *
     * @param {object} gulp
     */
    saveAs(gulp) {
        return gulp.dest(this.output.baseDir);
    }


    /**
     * Handle successful compilation.
     *
     * @param {string|null} message
     */
    onSuccess(message) {
        message = message || `${this.ucName()} Compiled!`;

        return new Elixir.Notification(message);
    }


    /**
     * Handle a compilation error.
     */
    onError(e) {
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
    log(message) {
        if (message) {
            return Elixir.log.status(message);
        }

        if (this.src) {
            Elixir.log.files(
                `Fetching ${this.ucName()} Source Files...`,
                this.src.path ? this.src.path : this.src
            );
        }

        if (this.output) {
            Elixir.log.files(
                'Saving To...',
                this.output.path ? this.output.path : this.output,
                false
            );
        }
    }


    /**
     * Translate the task instance to a registered Gulp task.
     */
    toGulp() {
        const name = this.name;

        // If we've already created a Gulp task,
        // we can exit early. Nothing to do.
        if (_.has(gulp.tasks, name)) {
            return;
        }

        gulp.task(name, () => {
            if (shouldRunAllTasksWithName(name)) {
                return Elixir.tasks.byName(name)
                    .forEach(task => task.run());
            }

            // Otherwise, we can run the current task.
            return Elixir.tasks.findIncompleteByName(name)[0].run();
        });
    }
}


/**
 * See if we should run all mixins for the given task name.
 *
 * @param  {string} name
 * @return {boolean}
 */
const shouldRunAllTasksWithName = function(name) {
    return _.intersection(gutils.env._, [name, 'watch', 'tdd']).length;
};


export default Task;
