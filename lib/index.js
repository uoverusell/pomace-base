'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleton = exports.sequence = exports.now = exports.dateFormate = exports.searchGartherDom = exports.searchDOM = exports.gartherDOM = exports.buildDOM = exports.errBreak = exports.openLog = exports.debug = exports.captureException = undefined;

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

var _serialize = require('./serialize');

var _serialize2 = _interopRequireDefault(_serialize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*！
 * pomace base javascript library
 * pomace base - v0.1.0 (2016-07-30)
 */

var captureException = exports.captureException = _log2.default.captureException;
var debug = exports.debug = _log2.default.debug;
var openLog = exports.openLog = _log2.default.openLog;
var errBreak = exports.errBreak = _log2.default.errBreak;
var buildDOM = exports.buildDOM = _dom2.default.buildDOM;
var gartherDOM = exports.gartherDOM = _dom2.default.gartherDOM;
var searchDOM = exports.searchDOM = _dom2.default.searchDOM;
var searchGartherDom = exports.searchGartherDom = _dom2.default.searchGartherDOM;
var dateFormate = exports.dateFormate = _clock2.default.dateFormat;
var now = exports.now = _clock2.default.now;
var sequence = exports.sequence = _serialize2.default.sequence;
var singleton = exports.singleton = _serialize2.default.singleton;

exports.default = {
  log: _log2.default,
  dom: _dom2.default,
  clock: _clock2.default,
  serialize: _serialize2.default
};