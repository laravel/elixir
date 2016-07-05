describe('Styles Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('merges stylesheets together', function(done) {
        Elixir(mix => mix.styles(['one.css', 'two.css']));

        runGulp(() => {
            shouldExist('public/css/all.css');

            done();
        });
    });

    it('merges to any file the user wishes', function(done) {
        Elixir(mix => mix.styles(['one.css', 'two.css'], './public/css/merged.css'));

        runGulp(() => {
            shouldExist('public/css/merged.css');

            done();
        });
    });

    it('applies a custom base directory', function(done) {
        Elixir(mix => {
            // We'll copy files over to a custom directory to test this.
            mix.copy('./resources/assets/css', './resources/assets/styles');

            mix.styles(['one.css', 'two.css'], null, './resources/assets/styles');
        });

        runGulp(() => {
            shouldExist('public/css/all.css');

            done();
        });
    });
});
