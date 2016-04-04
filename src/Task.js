import gulp from 'gulp';
import _ from 'underscore';
import gutils from 'gulp-util';

let Elixir;

class Task {

    /**
     * Create a new Task instance.
     *
     * @param {string}   name
     * @param {Function} description
     */
    constructor(name, description) {
        this.name = name;
        this.watchers = [];
        this.isComplete = false;

        if (description) {
            this.describe(description);
        }
    }

    /**
     * Fetch the task(s) with the given name.
     *
     * @deprecated
     * @param  {string} name
     * @return {Task}
     */
    static find(name) {
        return Elixir.tasks.byName(name)[0];
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
    hasWatchers () {
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

        return this.definition();
    }

    /**
     * Log the task input and output.
     *
     * @param {string|Array} src
     * @param {string|null}  output
     */
    log(src, output) {
        var task = this.name.substr(0,1).toUpperCase() + this.name.substr(1);

        Elixir.Log
           .heading("Fetching " + task + " Source Files...")
           .files(src.path ? src.path : src, true);

        if (output) {
            Elixir.Log
                .heading('Saving To...')
                .files(output.path ? output.path : output);
        }
    }

    /**
     * Translate the task instance to a registered Gulp task.
     */
    toGulp () {
        const name = this.name;

        // If we've already created a Gulp task,
        // we can exit early. Nothing to do.
        if (_.has(gulp.tasks, name)) {
            return;
        }

        gulp.task(name, function () {
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
let shouldRunAllTasksWithName = function(name) {
    return _.intersection(gutils.env._, [name, 'watch', 'tdd']).length;
};

export default function(elixir) {
    // Make Elixir available throughout this file.
    Elixir = elixir;

    return Task;
};
