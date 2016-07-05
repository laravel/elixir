import TasksCollection from 'laravel-elixir/dist/tasks/TaskCollection';

let Task = Elixir.Task;

describe('Task Collection', function() {
    let taskOne, taskTwo, taskThree, tasks;

    beforeEach(() => {
        taskOne = new Task('foo');
        taskTwo = new Task('bar');
        taskThree = new Task('foo');

        tasks = new TasksCollection([taskOne, taskTwo, taskThree]);
    });

    it('fetches all tasks', () => {
        expect(tasks.all()).to.have.length(3);
    });

    it('knows if it has a task with the given name', () => {
        expect(tasks.has('foo')).to.be.true;
        expect(tasks.has('baz')).to.be.false;
    });

    it('pushes a new task onto the collection', () => {
        tasks.push(new Task('baz'));

        expect(tasks.all()).to.have.length(4);
    });

    it('can cycle through all tasks', () => {
        let count = 0;

        tasks.forEach(() => count++);

        expect(count).to.eql(3);
    });

    it('plucks the names of each task', () => {
        expect(tasks.names()).to.eql(['foo', 'bar', 'foo']);
    });

    it('filters all tasks with a where condition', () => {
        expect(tasks.where({ isComplete: true })).to.be.empty;
        expect(tasks.where({ isComplete: false })).to.have.length(3);
    });

    it('find all tasks with the given name', () => {
        expect(tasks.byName('foo')).to.have.length(2);
    });

    it('finds all incomplete tasks with the given name', () => {
        expect(tasks.findIncompleteByName('foo')).to.have.length(2);

        taskOne.isComplete = true;

        expect(tasks.findIncompleteByName('foo')).to.have.length(1);
    });

    it('empties the underlying list of tasks', () => {
        tasks.empty();

        expect(tasks.all()).to.be.empty;
    });
});
