import fs from 'fs';
import gutil from 'gulp-util';
import Table from 'cli-table';

class TaskStats {
    /**
     * Render a single task.
     *
     * @param {Task} task
     */
    renderTask(task) {
        let table = this.makeTable();

        this.addRow(table, task);

        Elixir.log.message(table.toString());
    }


    /**
     * Render all tasks.
     */
    renderAllTasks() {
        let table = this.makeTable();

        Elixir.tasks.forEach(
            task => this.addRow(table, task)
        );

        Elixir.log.message(table.toString());
    }


    /**
     * Create the table rows.
     */
    makeTable() {
        return new Table({
            head: [
                'Task',
                "Source Files",
                "Destination"
            ],
            colWidths: [20, 40, 30]
        });
    }


    /**
     * Add a row to the table.
     *
     * @param {Table} table
     * @param {Task}  task
     */
    addRow(table, task) {
        let row = [`mix.${task.name}()`];

        if (task.src && task.output) {
            row.push(
                this.getFormattedSrc(task),
                task.output.path || task.output
            );
        }

        table.push(row);
    }


    /**
     * Get a string version of the src files.
     *
     * @param  {Task} task
     * @return {string}
     */
    getFormattedSrc(task) {
        let src = task.src.path || task.src;

        src = Array.isArray(src) ? src : [src];

        return src.map(file => this.format(file)).join('\n');
    }


    /**
     * Log the existence of a file to the console.
     *
     * @param  {string}  file
     * @return {mixed}
     */
    format(file) {
        if (fileExists(file)) {
            return gutil.colors.green(file);
        }

        return gutil.colors.bgRed(file);
    }
}


/**
 * Assert that the given file exists.
 *
 * @param  {string} file
 * @return {boolean}
 */
function fileExists(file) {
    // If this file begins with a !, then the
    // user intends to exclude it from the
    // src set; we're free to ignore it.
    if (file.indexOf('!') == 0) return true;

    return file.match(/\*/) || fs.existsSync(file);
};


export default TaskStats;
