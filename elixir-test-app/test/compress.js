describe('Compress Task', function() {

    beforeEach(() => {
        Elixir.inProduction = true;
        Elixir.tasks.empty();
    });

    after( () => Elixir.inProduction = false);

    it('compresses a single JavaScript file', done => {
        Elixir(mix => mix.compress('./compress/file.js'));

        runGulp(() => {
            shouldExist('./compress/file.min.js',
`var foo,bar;
//# sourceMappingURL=file.min.js.map
`);

            done();
        });
    });

    it('compresses a single CSS file', done => {
        Elixir(mix => mix.compress('./compress/file.css'));

        runGulp(() => {
            shouldExist('./compress/file.min.css',
`.one,.two{color:red}
/*# sourceMappingURL=file.min.css.map */
`);

            done();
        });
    });

    it('can output to any file path', done => {
        Elixir(mix => mix.compress('./compress/file.js', './public/out.js'));

        runGulp(() => {
            shouldExist('./public/out.js');

            done();
        });
    });

    it('compresses an array of JS or CSS files', done => {
        Elixir(mix => mix.compress([
            './compress/file.js',
            './compress/file2.js'
        ], './compress/all.js'));

        runGulp(() => {
            shouldExist('./compress/all.js',
`var foo,bar,baz;
//# sourceMappingURL=all.js.map
`);

            done();
        });
    });

    it('can output to any directory', done => {
        Elixir(mix => mix.compress('./compress/file.js', './public'));

        runGulp(() => {
            shouldExist('./public/file.js');

            done();
        });
    });
});
