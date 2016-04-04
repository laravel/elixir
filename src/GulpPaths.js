import p from 'path';
import gutils from 'gulp-util';
import parsePath from 'parse-filepath';

export default class GulpPaths {

    /**
     * Set the Gulp src file(s) and path prefix.
     *
     * @param  {string|Array} src
     * @param  {string|null}  prefix
     * @return {GulpPaths}
     */
    src(src, prefix) {
        src = this.prefix(src, prefix);

        if (Array.isArray(src)) {
            // If any item in the src array is a folder
            // then we will fetch all of the files.
            src = src.map(path => {
                if (this.parse(path).isDir) {
                    path += '/**/*';
                }

                return path;
            });

            this.src = { path: src, baseDir: prefix };
        } else {
            this.src = this.parse(src);

            // If a directory is provided as the Gulp src,
            // the user probably wants everything in it.
            this.src.isDir && (this.src.path += '/**/*');
        }

        return this;
    }

    /**
     * Set the Gulp output path.
     *
     * @param  {string}      output
     * @param  {string|null} defaultName
     * @return {GulpPaths}
     */
    output(output, defaultName) {
        this.output = this.parse(output);

        if ( ! this.output.name && defaultName) {
            // See if we can use the name of the input file for the output name,
            // just as long as we substitute the ext name (.sass => .css).
            if ( ! Array.isArray(this.src.path) && this.src.name.indexOf('*') == -1) {
                defaultName = this.changeExtension(
                    this.src.name,
                    this.parse(defaultName).extension
                );
            }

            this.output = this.parse(p.join(output, defaultName));
        }

        return this;
    }

    /**
     * Change the file extension for a path.
     *
     * @param  {string} path
     * @param  {string} newExtension
     * @return {string}
     */
    changeExtension(path, newExtension) {
        return gutils.replaceExtension(path, newExtension);
    }

    /**
     * Apply a path prefix to the path(s).
     *
     * @param  {string|Array} path
     * @param  {string|null}  prefix
     * @return {string|Array}
     */
    prefix(path, prefix) {
        if ( ! prefix) return path;

        let prefixOne = function(path) {
            // Given any path that begins with a period, we
            // can safely assume that the user wants to
            // skip the prefix and begin at the root.
            if (path.indexOf('./') == 0) {
                return path;
            }

            // If the provided path starts with a bang, then
            // it should be excluded from the src set.
            if (path.indexOf('!') == 0) {
                path = '!' + p.join(prefix, path.substring(1));
            } else {
                path = p.join(prefix, path);
            }

            return path.replace(/\/\//g, '/')
                .replace(/\/\//g, '/')
                .replace(p.join(prefix, prefix), prefix);
        };

        if (Array.isArray(path)) {
            return path.map(prefixOne);
        }

        return prefixOne(path);
    }

    /**
     * Parse the given file path.
     *
     * @param  {string} path
     * @return {object}
     */
    parse(path) {
        let segments = parsePath(path);

        return {
            path      : path,
            name      : segments.extname ? segments.basename : '',
            extension : segments.extname,
            isDir     : ! (!! segments.extname),
            baseDir   : segments.extname
                            ? segments.dirname
                            : p.join(segments.dirname, segments.basename)
        };
    }
}
