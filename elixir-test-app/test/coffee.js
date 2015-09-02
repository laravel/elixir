var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Elixir = require('laravel-elixir');


describe('Coffee Task', function() {

    beforeEach(() => {
        Elixir.tasks = Elixir.config.tasks = [];
    });

    it('compiles CoffeeScript files to the public/js directory', done => {
        Elixir(mix => mix.coffee('module.coffee'));

        runGulp(() => {
            shouldExist('./public/js/module.js');

            done();
        });
    });


    it('can compile to a different path', done => {
        Elixir(mix => mix.coffee('module.coffee', './public/scripts/file.js'));

        runGulp(() => {
            shouldExist('./public/scripts/file.js');

            done();
        });

    });

});


var shouldExist = (file) => {
    return fs.existsSync(file).should.be.true;
};


var runGulp = assertions => {
    gulp.start('default', () => {
        assertions();

        remove.sync('./public/js');
        remove.sync('./public/scripts');
    });
};