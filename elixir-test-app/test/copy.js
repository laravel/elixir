var fs     = require('fs');
var gulp   = require('gulp');
var remove = require('rimraf');
var should = require('chai').should();
var Elixir = require('laravel-elixir');


describe('Copy Task', function() {

    beforeEach(() => {
        Elixir.tasks = Elixir.config.tasks = [];
    });

    it('copies a file to a new location', function(done) {
        Elixir(mix => mix.copy('copy/foo/foo.txt', 'copy-dest'));

        runGulp(() => {
            shouldExist('copy-dest/foo.txt');

            done();
        });
    });

    it('copies and renames a file to a new location', function(done) {
        Elixir(mix => mix.copy('copy/foo/foo.txt', 'copy-dest/changed.txt'));

        runGulp(() => {
            shouldExist('copy-dest/changed.txt');

            done();
        });
    });

    it('copies an array of folder paths to a new location', function(done) {
        Elixir(mix => mix.copy(['copy/foo', 'copy/bar'], 'copy-dest'));

        runGulp(() => {
            shouldExist('copy-dest/foo.txt');
            shouldExist('copy-dest/bar.txt');

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

        remove.sync('./copy-dest');
    });
};