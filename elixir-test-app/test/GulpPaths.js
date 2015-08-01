var expect = require('chai').expect;
var GulpPaths = require('laravel-elixir').GulpPaths;

describe('Gulp Paths', function() {
    var paths;

    beforeEach(() => paths = new GulpPaths());

    it('fetches all files, if a directory is provided for the source', () => {
        paths = paths.src('some/src');

        expect(paths.src.path).to.equal('some/src/**/*');
    });

    it('fetches all files, if an item in array is a directory', () => {
        paths = paths.src(['some/file.txt', 'some/src']);

        expect(paths.src.path).to.eql(['some/file.txt', 'some/src/**/*']);
    });

    it('uses the src file name as the output name, if an output file is not set', () => {
        paths.src('src.scss').output('some/output', 'output.css');

        expect(paths.output.path).to.equal('some/output/src.css');
    });

    it('uses a default output name if no alternative is available', () => {
        paths.src(['file.scss']).output('some/output', 'output.css');

        expect(paths.output.path).to.equal('some/output/output.css');
    });

    it('prefixes a base directory', () => {
        expect(
            paths.prefix('some/path', 'some/prefix')
        ).to.equal('some/prefix/some/path');

        expect(
            paths.prefix(['one/path', 'second/path'], 'some/prefix')
        ).to.eql(['some/prefix/one/path', 'some/prefix/second/path']);

        // For any path beginning with a period, it's assumed that the
        // user wants to ignore the prefix, and begin with the project
        // root.
        expect(
            paths.prefix('./resources/custom/file.scss', 'some/prefix')
        ).to.equal('./resources/custom/file.scss');
    });

    it('changes an extension', () => {
        expect(
            paths.changeExtension('some/path/foo.txt', '.png')
        ).to.equal('some/path/foo.png');
    });

    it('parses a file path', () => {
        var parsed = paths.parse('foo/bar/path/file.txt');

        expect(parsed.path).to.equal('foo/bar/path/file.txt');
        expect(parsed.name).to.equal('file.txt');
        expect(parsed.extension).to.equal('.txt');
        expect(parsed.isDir).to.be.false;
        expect(parsed.baseDir).to.equal('foo/bar/path');
    });

});