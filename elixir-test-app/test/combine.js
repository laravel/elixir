var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Elixir = require('laravel-elixir');


describe('Coffee Task', function() {

    beforeEach(() => {
        Elixir.tasks = Elixir.config.tasks = [];
    });

    it('combines a given array of files.', done => {
        Elixir(mix => mix.combine([
            'resources/assets/js/lib1.js',
            './resources/assets/js/lib2.js'
        ], './public/js/combined.js'));

        runGulp(() => {
            shouldExist('./public/js/combined.js');

            fs.readFileSync('./public/js/combined.js', { encoding: 'utf8' })
                .should.equal('var somelib;\nvar anotherlib;');

            done();
        });
    });

    it('allows for an optional base directory', done => {
        Elixir(mix => mix.combine([
            'js/lib1.js',
            'js/lib2.js'
        ], './public/js/combined.js', 'resources/assets'));

        runGulp(() => {
            shouldExist('./public/js/combined.js');

            fs.readFileSync('./public/js/combined.js', { encoding: 'utf8' })
                .should.equal('var somelib;\nvar anotherlib;');

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

        remove.sync('./public');
    });
};