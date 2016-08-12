import TaskReporter from './TaskReporter';
import Table from 'cli-table';

class MinimalTaskReporter extends TaskReporter {

    /**
     * Create the table rows.
     */
    makeTable() {
        return new Table({
            head: [
                'Task',
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
            let row = [`mix.${task.name}()`];

            if (task.src && task.output) {
                row.push(
                    this.src(task),
                    task.output.path || task.output
                );
            }

            table.push(row);
        });
    }
}


export default MinimalTaskReporter;
