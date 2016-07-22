import TaskReporter from './TaskReporter';

class MinimalTaskReporter extends TaskReporter {

    /**
     * Render a single task.
     *
     * @param {Task|null} task
     */
    report(task) {
        var tasks = task ? [task] : Elixir.tasks;

        tasks.forEach(task => {
            Elixir.log.heading(`${task.ucName()}: Fetching Source Files`);
            Elixir.log.message(this.src(task));

            Elixir.log.heading('Saving To:');
            Elixir.log.message(`\t- ${task.output.path || task.output}`);
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

        return '\t- ' + src.map(file => this.colorize(file)).join('\n\t- ');
    }
}


export default MinimalTaskReporter;
