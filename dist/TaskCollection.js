'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TaskCollection = function () {

    /**
     * Create a new TaskCollection instance.
     */

    function TaskCollection() {
        _classCallCheck(this, TaskCollection);

        this.tasks = [];
    }

    /**
     * Fetch the underlying array of tasks.
     *
     * @return {array}
     */


    _createClass(TaskCollection, [{
        key: 'all',
        value: function all() {
            return this.tasks;
        }

        /**
         * Check if the collection has a task with the given name.
         *
         * @param  {string}  taskName
         * @return {boolean}
         */

    }, {
        key: 'has',
        value: function has(taskName) {
            return _underscore2.default.contains(this.names(), taskName);
        }

        /**
         * Add a new task to the collection.
         *
         * @param  {Task} task
         * @return {void}
         */

    }, {
        key: 'push',
        value: function push(task) {
            this.tasks.push(task);
        }

        /**
         * Filter through the tasks.
         *
         * @param  {function} callable
         * @return {void}
         */

    }, {
        key: 'forEach',
        value: function forEach(callable) {
            this.tasks.forEach(callable);
        }

        /**
         * Pluck all task names from the collection.
         *
         * @return {array}
         */

    }, {
        key: 'names',
        value: function names() {
            return _underscore2.default.pluck(this.tasks, 'name');
        }

        /**
         * Find all tasks having the given params.
         *
         * @param  {object} params
         * @return {array}
         */

    }, {
        key: 'where',
        value: function where(params) {
            return _underscore2.default.where(this.tasks, params);
        }

        /**
         * Find all tasks with the given name.
         *
         * @param  {string} name
         * @return {array}
         */

    }, {
        key: 'byName',
        value: function byName(name) {
            return this.where({ name: name });
        }

        /**
         * Find all tasks with the given name.
         *
         * @param  {string} name
         * @return {array}
         */

    }, {
        key: 'findIncompleteByName',
        value: function findIncompleteByName(name) {
            return this.where({
                name: name,
                isComplete: false
            });
        }

        /**
         * Empty out all tasks.
         */

    }, {
        key: 'empty',
        value: function empty() {
            this.tasks = [];
        }
    }]);

    return TaskCollection;
}();

exports.default = TaskCollection;