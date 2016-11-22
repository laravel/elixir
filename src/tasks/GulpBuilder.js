import { has, intersection } from 'underscore';
import gutils from 'gulp-util';

class GulpBuilder {

    /**
     * Create a new instance.
     *
     * @param {Task} task
     */
    constructor(task) {
        this.task = task;
    }


    /**
     * Named constructor to prep a Elixir -> Gulp conversion.
     *
     * @param  {Task} task
     * @return {GulpTask}
     */
    static fromElixirTask(task) {
        return new GulpBuilder(task).build();
    }


    /**
     * Convert the Elixir task to a Gulp task.
     */
    build() {
        let name = this.task.name;

        if (has(gulp.tasks, name)) return;

        this.task.loadDependencies && this.task.loadDependencies();

        gulp.task(name, () => {
            if (this.shouldRunAllTasksNamed(name)) {
                return Elixir.tasks
                    .byName(name)
                    .filter(task => !Elixir.tasks.watching || Elixir.tasks.watching === task)
                    .forEach(task => task.run());
            }

            return Elixir.tasks
                .findIncompleteByName(name)[0]
                .run();
        });
    }


    /**
     * See if we should run all mixins for the given task name.
     *
     * @param  {string} name
     * @return {Boolean}
     */
    shouldRunAllTasksNamed(name) {
        return intersection(gutils.env._, [name, 'watch', 'tdd']).length;
    }
}

export default GulpBuilder;
