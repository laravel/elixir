describe('Copy Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('copies a file to a new location', function(done) {
        Elixir(mix => mix.copy('copy/foo/foo.txt', 'copy-dest'));

        runGulp(() => {
            shouldExist('copy-dest/foo.txt');

            done();
        });
    });

    it('copies and renames a file to a new location', function(done) {
        Elixir(mix => mix.copy('copy/foo/foo.txt', 'copy-dest/changed.txt'));

        runGulp(() => {
            shouldExist('copy-dest/changed.txt');

            done();
        });
    });

    it('copies an array of folder paths to a new location', function(done) {
        Elixir(mix => mix.copy(['copy/foo', 'copy/bar'], 'copy-dest'));

        runGulp(() => {
            shouldExist('copy-dest/foo.txt');
            shouldExist('copy-dest/bar.txt');

            done();
        });
    });

    it('copies a folder with a period in its name to a new location', function(done) {
        Elixir(mix => mix.copy('copy/foo.bar', 'copy-dest/some.dir'));

        runGulp(() => {
            shouldExist('copy-dest/some.dir/baz.txt');

            done();
        });
    });
});
