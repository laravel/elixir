'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (elixir) {
    // Make Elixir available throughout this file.
    Elixir = elixir;

    return Task;
};

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Elixir = void 0;

var Task = function () {

    /**
     * Create a new Task instance.
     *
     * @param {string}   name
     * @param {Function} description
     */

    function Task(name, description) {
        _classCallCheck(this, Task);

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


    _createClass(Task, [{
        key: 'describe',


        /**
         * Describe the task. This is the Gulp definition.
         *
         * @param  {Function} definition
         * @return {Task}
         */
        value: function describe(definition) {
            this.definition = definition;

            return this.register();
        }

        /**
         * Set the task to be called, when firing `Gulp`.
         *
         * @return {Task}
         */

    }, {
        key: 'register',
        value: function register() {
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

    }, {
        key: 'watch',
        value: function watch(regex, category) {
            if (regex) {
                this.watchers = this.watchers.concat(regex);
            }

            this.category = category || 'default';

            return this;
        }

        /**
         * Determine if the task has any watchers.
         */

    }, {
        key: 'hasWatchers',
        value: function hasWatchers() {
            return this.watchers.length > 0;
        }

        /**
         * Exclude the given path from the watcher.
         *
         * @param  {string} path
         * @return {Task}
         */

    }, {
        key: 'ignore',
        value: function ignore(path) {
            this.watchers.push(('!./' + path).replace('././', './'));

            return this;
        }

        /**
         * Execute the task definition.
         */

    }, {
        key: 'run',
        value: function run() {
            this.isComplete = true;

            return this.definition();
        }

        /**
         * Log the task input and output.
         *
         * @param {string|Array} src
         * @param {string|null}  output
         */

    }, {
        key: 'log',
        value: function log(src, output) {
            var task = this.name.substr(0, 1).toUpperCase() + this.name.substr(1);

            Elixir.Log.heading("Fetching " + task + " Source Files...").files(src.path ? src.path : src, true);

            if (output) {
                Elixir.Log.heading('Saving To...').files(output.path ? output.path : output);
            }
        }

        /**
         * Translate the task instance to a registered Gulp task.
         */

    }, {
        key: 'toGulp',
        value: function toGulp() {
            var name = this.name;

            // If we've already created a Gulp task,
            // we can exit early. Nothing to do.
            if (_underscore2.default.has(_gulp2.default.tasks, name)) {
                return;
            }

            _gulp2.default.task(name, function () {
                if (shouldRunAllTasksWithName(name)) {
                    return Elixir.tasks.byName(name).forEach(function (task) {
                        return task.run();
                    });
                }

                // Otherwise, we can run the current task.
                return Elixir.tasks.findIncompleteByName(name)[0].run();
            });
        }
    }], [{
        key: 'find',
        value: function find(name) {
            return Elixir.tasks.byName(name)[0];
        }
    }]);

    return Task;
}();

/**
 * See if we should run all mixins for the given task name.
 *
 * @param  {string} name
 * @return {boolean}
 */


var shouldRunAllTasksWithName = function shouldRunAllTasksWithName(name) {
    return _underscore2.default.intersection(_gulpUtil2.default.env._, [name, 'watch', 'tdd']).length;
};

;