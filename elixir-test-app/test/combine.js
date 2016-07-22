describe('Combine Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('combines a given array of files.', done => {
        Elixir(mix => mix.combine([
            'resources/assets/js/lib1.js',
            './resources/assets/js/lib2.js'
        ], './public/js/combined.js'));

        runGulp(() => {
            shouldExist('./public/js/combined.js',
`var somelib;
var anotherlib;`);

            done();
        });
    });

    it('allows for an optional base directory', done => {
        Elixir(mix => mix.combine([
            'js/lib1.js',
            'js/lib2.js'
        ], './public/js/combined.js', 'resources/assets'));

        runGulp(() => {
            shouldExist('./public/js/combined.js',
`var somelib;
var anotherlib;`);

            done();
        });
    });
});
