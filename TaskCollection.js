var _ = require('underscore');

/**
 * Create a new TaskCollection instance.
 */
var TaskCollection = function() {
    this.tasks = [];
};

/**
 * Fetch the underlying array of tasks.
 *
 * @return {array}
 */
TaskCollection.prototype.all = function () {
    return this.tasks;
}

/**
 * Check if the collection has a task with the given name.
 *
 * @param  {string}  taskName
 * @return {boolean}
 */
TaskCollection.prototype.has = function (taskName) {
    return _.contains(this.names(), taskName);
};

/**
 * Add a new task to the collection.
 *
 * @param  {Task} task
 * @return {void}
 */
TaskCollection.prototype.push = function (task) {
    this.tasks.push(task);
};

/**
 * Filter through the tasks.
 *
 * @param  {function} callable
 * @return {void}
 */
TaskCollection.prototype.forEach = function (callable) {
    this.tasks.forEach(callable);
};

/**
 * Pluck all task names from the collection.
 *
 * @return {array}
 */
TaskCollection.prototype.names = function () {
    return _.pluck(this.tasks, 'name');
};

/**
 * Find all tasks having the given params.
 *
 * @param  {object} terms
 * @return {array}
 */
TaskCollection.prototype.where = function (params) {
    return _.where(this.tasks, params);
};

/**
 * Find all tasks with the given name.
 *
 * @param  {string} name
 * @return {array}
 */
TaskCollection.prototype.byName = function (name) {
    return this.where({ name: name });
};

/**
 * Find all tasks with the given name.
 *
 * @param  {string} name
 * @return {array}
 */
TaskCollection.prototype.findIncompleteByName = function (name) {
    return this.where({
        isComplete: false,
        name: name
    });
};


module.exports = TaskCollection;
