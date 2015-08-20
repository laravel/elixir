var p = require('path');
var gutils = require('gulp-util');
var parsePath = require('parse-filepath');


/**
 * Create a new GulpPaths constructor.
 *
 * @param {string|array} path
 * @param {string}       defaultName
 */
var GulpPaths = function() {};


/**
 * Set the Gulp src file(s) and path prefix.
 *
 * @param {string|array} src
 * @param {string}       prefix
 */
GulpPaths.prototype.src = function(src, prefix) {
    var self = this;

    src = this.prefix(src, prefix);

    if (Array.isArray(src)) {
        // If any item in the src array is a folder
        // then we will fetch all of the files.
        src = src.map(function(path) {
            if (self.parse(path).isDir) {
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
};


/**
 * Set the Gulp output path.
 *
 * @param {string} src
 * @param {string} prefix
 */
GulpPaths.prototype.output = function(output, defaultName) {
    this.output = this.parse(output);

    // If the user didn't provide a path AND file name
    // then we'll do our best to choose a default.
    if ( ! this.output.name && defaultName) {
        // We'll check to see if the provided src is not
        // an array. If so, we'll use that single file
        // name as the output name. But we must also
        // change the extension (.sass -> .css).
        if ( ! Array.isArray(this.src.path) && this.src.name.indexOf('*') == -1) {
            defaultName = this.changeExtension(
                this.src.name,
                this.parse(defaultName).extension
            );
        }

        this.output = this.parse(p.join(output, defaultName));
    }

    return this;
};


/**
 * Change the file extension for a path.
 *
 * @param {string} path
 * @param {string} newExtension
 */
GulpPaths.prototype.changeExtension = function(path, newExtension) {
    return gutils.replaceExtension(path, newExtension);
};


/**
 * Apply a path prefix to the path(s).
 *
 * @param  {string} prefix
 * @return {string|array}
 */
GulpPaths.prototype.prefix = function(path, prefix) {
    if ( ! prefix) return path;

    var prefixOne = function(path) {
        // Given any path that begins with a period, we
        // can safely assume that the user wants to
        // skip the prefix and begin at the root.
        if (path.indexOf('./') == 0) {
            return path;
        }

        return p.join(prefix, path)
            .replace(/\/\//g, '/')
            .replace(p.join(prefix, prefix), prefix);
    };

    if (Array.isArray(path)) {
        return path.map(prefixOne);
    }

    return prefixOne(path);
};


/**
 * Parse the given file path.
 *
 * @param  {string} path
 * @return {object}
 */
GulpPaths.prototype.parse = function(path) {
    var segments = parsePath(path);

    return {
        path      : path,
        name      : segments.extname ? segments.basename : '',
        extension : segments.extname,
        isDir     : ! (!! segments.extname),
        baseDir   : segments.extname
                        ? segments.dirname
                        : p.join(segments.dirname, segments.basename)
    };
};


module.exports = GulpPaths;
