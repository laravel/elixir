import gulp from 'gulp';
import Elixir from '../../index';

const notify = new Elixir.Notification();

export default function(name, src, command) {
    new Elixir.Task(name, function(error) {
        Elixir.Log.heading('Triggering ' + name + ': ' + command);

        return (
            gulp
            .src('')
            .pipe(Elixir.Plugins.shell(command))
            .on('error', function(e) {
                notify.forFailedTests(e, name);

                this.emit('end');
            })
            .pipe(notify.forPassedTests(name))
        );
    })
    .watch(src)
    .watch(Elixir.config.appPath + '/**/*.php', 'tdd')
    .watch(Elixir.config.viewPath +'/**/*.php', 'tdd');
};
