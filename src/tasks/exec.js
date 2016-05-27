import {exec} from 'child_process';

/*
 |----------------------------------------------------------------
 | Shell Commands
 |----------------------------------------------------------------
 |
 | Need to execute a shell script, as part of your compile
 | process? No problem. Elixir can help with that. Just
 | call `mix.exec('command')`, and, bam, you're set!
 |
 */

Elixir.extend('exec', function(command, watcher) {
    let task = new Elixir.Task('exec', function() {
        this.log(`Executing Command: ${command}`);

        exec(command, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);

            this.cb();
        });
    });

    watcher && task.watch(watcher);
});
