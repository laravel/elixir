import Elixir from '../../index';

export default function(name, src, command) {
    const notify = new Elixir.Notification();

    new Elixir.Task(name, function(gulp, $) {
        Elixir.Log.heading(`Triggering ${name}: ${command}`);

        return (
            gulp
            .src('')
            .pipe($.shell(command))
            .on('error', function(e) {
                notify.forFailedTests(e, name);

                this.emit('end');
            })
            .pipe(notify.forPassedTests(name))
        );
    })
    .watch(src)
    .watch(Elixir.config.appPath + '/**/*.php', 'tdd')
    .watch(Elixir.config.viewPath + '/**/*.php', 'tdd');
};
