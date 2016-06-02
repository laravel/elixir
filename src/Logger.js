import gutil from 'gulp-util';
import TaskStats from './TaskStats';

class Logger {
    /**
     * Create a new Logger instance.
     */
    constructor() {
        this.stats = new TaskStats();
    }


    /**
     * Log a heading to the console.
     *
     * @param  {string} heading
     * @return {this}
     */
    heading(heading) {
        return this.break().message(
            gutil.colors.black(gutil.colors.bgGreen(heading))
        );
    };


    /**
     * Log the stats for a single tasks.
     *
     * @param {Task} task
     */
    task(task) {
        this.stats.renderTask(task);
    }


    /**
     * Log the stats for all triggered tasks.
     */
    tasks() {
        this.stats.renderAllTasks();
    }


    /**
     * Log a general message to the console.
     *
     * @param  {string} message
     * @return {this}
     */
    message(message) {
        if (this.shouldBeMuted()) {
            return this;
        }

        console.log(message);

        return this;
    };


    /**
     * Log a heading and message to the console.
     *
     * @param  {string}      heading
     * @param  {string|null} message
     * @return {this}
     */
    status(heading, message) {
        this.heading(heading);

        message && this.message(message);

        return this;
    }


    /**
     * Log an error message to the console.
     *
     * @param {string} message
     */
    error(message) {
        this.break().message(
            gutil.colors.bgRed(message)
        );

        return this;
    }


    /**
     * Add a line break to the console output.
     *
     * @return {this}
     */
    break() {
        console.log(''); // line break

        return this;
    }


    /**
     * Determine if we're in test-mode.
     *
     * @return {boolean}
     */
    shouldBeMuted() {
        return process.argv[1].indexOf('bin/_mocha') > -1;
    }
}


export default Logger;
