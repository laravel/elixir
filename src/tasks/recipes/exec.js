import {exec} from 'child_process';
import Q from 'q';

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
        let deferred = Q.defer();

        this.log(`Executing Command: ${command}`);

        exec(command, (err, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);

            deferred.resolve();
        });

        return deferred.promise;
    });

    watcher && task.watch(watcher);
});
