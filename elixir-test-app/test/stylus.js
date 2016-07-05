describe('Stylus Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('compiles Stylus', done => {
        Elixir(mix => mix.stylus('app.styl'));

        runGulp(() => {
            shouldExist('./public/css/app.css',
`body {
  color: #f00;
}

/*# sourceMappingURL=app.css.map */
`
);

            done();
        });
    });

    it('compiles Stylus to a custom output file.', done => {
        Elixir(mix => mix.stylus('app.styl', './public/out.css'));

        runGulp(() => {
            shouldExist('./public/out.css',
`body {
  color: #f00;
}

/*# sourceMappingURL=out.css.map */
`
);

            done();
        });
    });
});
