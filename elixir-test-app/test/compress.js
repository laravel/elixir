var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Elixir = require('laravel-elixir');


describe('Compress Task', function() {

    beforeEach(() => {
        Elixir.tasks.empty();
    });

    it('compresses a single JavaScript file', done => {
        Elixir(mix => mix.compress('./compress/file.js'));

        runGulp(() => {
            shouldExist('./compress/file.min.js', 'var foo,bar;');

            done();
        });
    });

    it('compresses a single CSS file', done => {
        Elixir(mix => mix.compress('./compress/file.css'));

        runGulp(() => {
            shouldExist('./compress/file.min.css', '.one,.two{color:red}');

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
            shouldExist('./compress/all.js', 'var foo,bar,baz;');

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

    it('can output an array of source files to any directory', done => {
        Elixir(mix => mix.compress(['./compress/file.js'], './public'));


        runGulp(() => {
            shouldExist('./public/file.js');

            done();
        });
    });
});


var shouldExist = (file, contents) => {
    fs.existsSync(file).should.be.true;

    if (contents) {
        fs.readFileSync(file, { encoding: 'utf8' }).should.equal(contents);
    }
};


var runGulp = assertions => {
    gulp.start('default', () => {
        assertions();

        remove.sync('./public');
        remove.sync('./compress/all.js');
        remove.sync('./compress/all.css');
        remove.sync('./compress/file.min.js');
        remove.sync('./compress/file.min.css');
    });
};
