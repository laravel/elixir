var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Elixir = require('laravel-elixir');


describe('Sass Task', function() {

    beforeEach(() => {
        Elixir.tasks = Elixir.config.tasks = [];
    });

    it('compiles Sass files to the public/css directory', done => {
        Elixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./public/css/app.css');

            done();
        });
    });

    it('creates sourcemaps for compiled Sass files', done => {
        Elixir(mix => mix.sass('app.scss'));

        runGulp(() => {
            shouldExist('./public/css/app.css.map');

            done();
        });
    });


    it('compiles to the source file name, if a single file is given', done => {
        Elixir(mix => mix.sass('another.scss'));

        runGulp(() => {
            shouldExist('./public/css/another.css');

            done();
        });
    });


    it('compiles to a custom directory and file name', done => {
        Elixir(mix => mix.sass(['app.scss', 'another.scss'], './public/styles/done.css'));

        runGulp(() => {
            shouldExist('./public/styles/done.css');

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

        remove.sync('./public/css');
        remove.sync('./public/styles');
    });
};
