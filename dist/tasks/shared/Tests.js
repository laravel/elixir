'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (name, src, command) {
    new _index2.default.Task(name, function (error) {
        _index2.default.Log.heading('Triggering ' + name + ': ' + command);

        return _gulp2.default.src('').pipe(_index2.default.Plugins.shell(command)).on('error', function (e) {
            notify.forFailedTests(e, name);

            this.emit('end');
        }).pipe(notify.forPassedTests(name));
    }).watch(src).watch(_index2.default.config.appPath + '/**/*.php', 'tdd').watch(_index2.default.config.viewPath + '/**/*.php', 'tdd');
};

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var notify = new _index2.default.Notification();

;