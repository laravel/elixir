import _ from 'underscore';

export default class TaskCollection {

    /**
     * Create a new TaskCollection instance.
     */
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    /**
     * Fetch the underlying array of tasks.
     *
     * @return {array}
     */
    all() {
        return this.tasks;
    }

    /**
     * Check if the collection has a task with the given name.
     *
     * @param  {string}  taskName
     * @return {boolean}
     */
    has(taskName) {
        return _.contains(this.names(), taskName);
    }

    /**
     * Add a new task to the collection.
     *
     * @param  {Task} task
     * @return {void}
     */
    push(task) {
        this.tasks.push(task);
    }

    /**
     * Filter through the tasks.
     *
     * @param  {function} callable
     * @return {void}
     */
    forEach(callable) {
        this.tasks.forEach(callable);
    }

    /**
     * Pluck all task names from the collection.
     *
     * @return {array}
     */
    names() {
        return _.pluck(this.tasks, 'name');
    }

    /**
     * Find all tasks having the given params.
     *
     * @param  {object} params
     * @return {array}
     */
    where(params) {
        return _.where(this.tasks, params);
    }

    /**
     * Find all tasks with the given name.
     *
     * @param  {string} name
     * @return {array}
     */
    byName(name) {
        return this.where({ name: name });
    }

    /**
     * Find all tasks with the given name.
     *
     * @param  {string} name
     * @return {array}
     */
    findIncompleteByName(name) {
        return this.where({
            name,
            isComplete: false
        });
    }

    /**
     * Empty out all tasks.
     */
    empty() {
        this.tasks = [];
    }
}
