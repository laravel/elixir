describe('Rollup Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles', function(done) {
        Elixir(mix => mix.rollup('main.js'));

        runGulp(() => {
            shouldExist('./public/js/main.js',
`(function () {
    'use strict';

    var SomeComponent = function SomeComponent() {
        ['one', 'two'].map(function (item) { return alert(item); });
    };

    new SomeComponent();

}());

//# sourceMappingURL=main.js.map
`);

            done();
        });
    });
});
