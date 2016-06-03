import fs from 'fs';
import gutil from 'gulp-util';
import Table from 'cli-table';

class TaskReporter {

    /**
     * Render a single task.
     *
     * @param {Task|null} task
     */
    report(task) {
        let table = this.makeTable();

        this.addRows(table, task ? [task] : Elixir.tasks);

        Elixir.log.message(table.toString());
    }


    /**
     * Create the table rows.
     */
    makeTable() {
        return new Table({
            head: [
                'Task',
                'Summary',
                'Source Files',
                'Destination'
            ]
        });
    }


    /**
     * Add any number of rows to the table.
     *
     * @param {Table} table
     * @param {array} tasks
     */
    addRows(table, tasks) {
        tasks.forEach(task => {
            let row = [`mix.${task.name}()`, task.summary()];

            if (task.src && task.output) {
                row.push(
                    this.src(task),
                    task.output.path || task.output

                );
            }

            table.push(row);
        });
    }


    /**
     * Get a string version of the src files.
     *
     * @param  {Task} task
     * @return {string}
     */
    src(task) {
        let src = task.src.path || task.src;

        src = Array.isArray(src) ? src : [src];

        return src.map(file => this.colorize(file)).join('\n');
    }


    /**
     * Get a colorized version of the file path,
     * based upon its existence.
     *
     * @param  {string}  file
     * @return {string}
     */
    colorize(file) {
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
}


export default TaskReporter;
