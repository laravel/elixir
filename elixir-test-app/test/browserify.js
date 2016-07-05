describe('Browserify Task', function() {

    beforeEach( () => Elixir.tasks.empty());

    it('bundles with Browserify', function(done) {
        Elixir(mix => mix.browserify('main.js'));

        runGulp(() => {
            shouldExist('./public/js/main.js',
`(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SomeComponent = function SomeComponent() {
    _classCallCheck(this, SomeComponent);

    ['one', 'two'].map(function (item) {
        return alert(item);
    });
};

exports.default = SomeComponent;
;

},{}],2:[function(require,module,exports){
'use strict';

var _SomeComponent = require('./SomeComponent');

var _SomeComponent2 = _interopRequireDefault(_SomeComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _SomeComponent2.default();

},{"./SomeComponent":1}]},{},[2]);

//# sourceMappingURL=main.js.map
`
);

            done();
        });
    });
});
