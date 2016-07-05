describe('Webpack Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('bundles with Webpack', function(done) {
        Elixir(mix => mix.webpack('main.js'));

        runGulp(() => {
            shouldExist('./public/js/main.js');

            done();
        });
    });

    it('bundles with Webpack to a custom output path.', function(done) {
        Elixir(mix => mix.webpack('main.js', './public/out.js'));

        runGulp(() => {
            shouldExist('./public/out.js');

            done();
        });
    });

    it('accepts Webpack config options', function(done) {
        Elixir(mix => mix.webpack('main.js', null, null, { output: { filename: 'changed.js' }}));

        runGulp(() => {
            shouldExist('./public/js/changed.js');

            done();
        });
    });
});
