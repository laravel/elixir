'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (options) {
    var name = options.name;

    loadPlugins();

    options.task.log(options.src, options.output);

    return _gulp2.default.src(options.src.path).pipe($.if(config.sourcemaps, $.sourcemaps.init())).pipe(options.compiler(options.pluginOptions)).on('error', function (e) {
        new _index2.default.Notification().error(e, name + ' Compilation Failed');

        this.emit('end');
    }).pipe($.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options))).pipe($.concat(options.output.name)).pipe($.if(config.production, minify())).pipe($.if(config.sourcemaps, $.sourcemaps.write('.'))).pipe(_gulp2.default.dest(options.output.baseDir)).pipe(new _index2.default.Notification(name + ' Compiled!'));
};

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _index2.default.Plugins;
var config = _index2.default.config;
var map = void 0;
var CleanCSS = void 0;

;

/**
 * Prepare the minifier instance.
 */
var minify = function minify() {
    return map(function (buff, filename) {
        return new CleanCSS(config.css.minifier.pluginOptions).minify(buff.toString()).styles;
    });
};

/**
 * Load the required Gulp plugins on demand.
 */
var loadPlugins = function loadPlugins() {
    map = require('vinyl-map');
    CleanCSS = require('clean-css');
};