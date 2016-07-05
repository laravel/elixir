describe('CoffeeScript Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles CoffeeScript', done => {
        Elixir(mix => mix.coffee('module.coffee'));

        runGulp(() => {
            shouldExist('./public/js/module.js',
`(function() {
  var MyModule;

  MyModule = (function() {
    function MyModule() {}

    return MyModule;

  })();

}).call(this);

//# sourceMappingURL=module.js.map
`
);

            done();
        });
    });

    it('compiles CoffeeScript to a custom output path.', done => {
        Elixir(mix => mix.coffee('module.coffee', './public/out.js'));

        runGulp(() => {
            shouldExist('./public/out.js');

            done();
        });
    });
});
