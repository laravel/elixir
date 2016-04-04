'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _parseFilepath = require('parse-filepath');

var _parseFilepath2 = _interopRequireDefault(_parseFilepath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GulpPaths = function () {
    function GulpPaths() {
        _classCallCheck(this, GulpPaths);
    }

    _createClass(GulpPaths, [{
        key: 'src',


        /**
         * Set the Gulp src file(s) and path prefix.
         *
         * @param  {string|Array} src
         * @param  {string|null}  prefix
         * @return {GulpPaths}
         */
        value: function src(_src, prefix) {
            var _this = this;

            _src = this.prefix(_src, prefix);

            if (Array.isArray(_src)) {
                // If any item in the src array is a folder
                // then we will fetch all of the files.
                _src = _src.map(function (path) {
                    if (_this.parse(path).isDir) {
                        path += '/**/*';
                    }

                    return path;
                });

                this.src = { path: _src, baseDir: prefix };
            } else {
                this.src = this.parse(_src);

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

    }, {
        key: 'output',
        value: function output(_output, defaultName) {
            this.output = this.parse(_output);

            // If the user didn't provide a path AND file name
            // then we'll do our best to choose a default.
            if (!this.output.name && defaultName) {
                // We'll check to see if the provided src is not
                // an array. If so, we'll use that single file
                // name as the output name. But we must also
                // change the extension (.sass -> .css).
                if (!Array.isArray(this.src.path) && this.src.name.indexOf('*') == -1) {
                    defaultName = this.changeExtension(this.src.name, this.parse(defaultName).extension);
                }

                this.output = this.parse(_path2.default.join(_output, defaultName));
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

    }, {
        key: 'changeExtension',
        value: function changeExtension(path, newExtension) {
            return _gulpUtil2.default.replaceExtension(path, newExtension);
        }

        /**
         * Apply a path prefix to the path(s).
         *
         * @param  {string|Array} path
         * @param  {string|null}  prefix
         * @return {string|Array}
         */

    }, {
        key: 'prefix',
        value: function prefix(path, _prefix) {
            if (!_prefix) return path;

            var prefixOne = function prefixOne(path) {
                // Given any path that begins with a period, we
                // can safely assume that the user wants to
                // skip the prefix and begin at the root.
                if (path.indexOf('./') == 0) {
                    return path;
                }

                // If path starts with "!" we need to negate him
                if (path.indexOf('!') == 0) {
                    path = '!' + _path2.default.join(_prefix, path.substring(1));
                } else {
                    path = _path2.default.join(_prefix, path);
                }

                return path.replace(/\/\//g, '/').replace(/\/\//g, '/').replace(_path2.default.join(_prefix, _prefix), _prefix);
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

    }, {
        key: 'parse',
        value: function parse(path) {
            var segments = (0, _parseFilepath2.default)(path);

            return {
                path: path,
                name: segments.extname ? segments.basename : '',
                extension: segments.extname,
                isDir: !!!segments.extname,
                baseDir: segments.extname ? segments.dirname : _path2.default.join(segments.dirname, segments.basename)
            };
        }
    }]);

    return GulpPaths;
}();

exports.default = GulpPaths;