'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleton = exports.sequence = undefined;

var _log = require('./log');

var serialize = new Object();

/**
 * 简易通用队列, start -> process -> process -> process
 * @method squence
 * @for serialize
 * @params {object} target 队列内容
 */
var sequence = exports.sequence = serialize.sequence = function () {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var list = [];
  var run = {};

  run.__count__ = 0;
  run.__pass__ = null;
  run.__outset__ = null;

  run.__continue__ = function () {
    if (run.__count__ >= list.length - 1) {
      return;
    }

    var doth = list[++run.__count__];

    if (doth.__seqName__ === run.__pass__) {
      (0, _log.debug)('[sequence] pass ' + doth.__seqName__);
      run.__count__++;
      run.__pass__ = null;
      doth = list[run.__count__];
    }

    (0, _log.debug)('[sequence] doth ' + doth.__seqName__);

    run.__count__ < list.length ? doth(run.__outset__) : null;
  };

  run.pass = function (n) {
    run.__pass__ = n;
  };

  run.begin = function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    run.__count__ = 0;
    params['next'] = run.__continue__;
    params['pass'] = run.pass;
    run.__outset__ = params;

    var doth = list[run.__count__];

    if (typeof doth !== 'function') {
      errBreak('sequence execute must a function');
      return;
    }

    (0, _log.debug)('[sequence] doth ' + doth.__seqName__);
    doth(run.__outset__);
  };

  var _loop = function _loop(i) {
    if (typeof target[i].doth !== 'function') {
      target[i].doth = function () {
        run.__continue__();
      };
    }
    var doth = function doth() {
      target[i].doth.apply(target[i], arguments);
    };
    doth.__seqName__ = target[i].key;
    list.push(doth);
  };

  for (var i = 0; i < target.length; i++) {
    _loop(i);
  }

  return run;
};

/**
 * 单列
 * @method singleton
 * @for serialize
 * @params {function} callback
 */
var singleton = exports.singleton = serialize.singleton = function (key) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Function();

  var g = window;

  if (!g.__pomace_serialize_singleton__) {
    g.__pomace_serialize_singleton__ = {};
  } else if (g.__pomace_serialize_singleton__.hasOwnProperty(key)) {
    return g.__pomace_serialize_singleton_[key];
  }

  return callback();
};

exports.default = serialize;