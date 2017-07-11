'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openLog = exports.captureException = exports.errBreak = exports.debug = undefined;

var _clock = require('./clock');

var G = window;
var log = new Object();

/**
 * 日志输出，日志内容在抛出异常时会全部被打印浏览器内，通常在console会显示。
 * @method debug
 * @for log
 * @params {string} content 日志内容
 */
var debug = exports.debug = log.debug = function (content) {
  if (!G.__chorus_debug__) {
    G.__chorus_debug__ = [];
  }

  content = (0, _clock.dateFormat)() + ' | ' + content;

  G.__chorus_debug__.push(content);

  if (log.__debug__ && log.__debug__.isPrint) {
    console.log(content);
  }
};

/**
 * 错误异常日志模板，断点
 * @module errBreak
 * @for log
 * @params {string} content 错误内容
 */
var errBreak = exports.errBreak = log.errBreak = function (content) {
  if (!G.__chorus_debug__) {
    G.__chorus_debug__ = [];
  }

  content = (0, _clock.dateFormat)() + ' | error | ' + content;

  G.__chorus_debug__.push(content);

  if (typeof G.handleError === 'function') {
    G.handleError(content);
  }

  if (!log.__error__ || !log.__error__.isPrint) {
    return;
  }

  var errorNode = document.createElement('div');
  var errorStyle = document.createElement('style');

  errorStyle.innerHTML = '\n     .__err_layer__     {position: absolute;z-index: 99999999999999999;top: 0;left: 0;width: 100%;height: 100%;opacity: 0.5%;background-color: #fff;}\n     .__err_layer__ p   {margin-top: 10px;margin-bottom: 10px;}\n     .__err_title__     {padding-top: 15px;padding-left: 15px;color: #c00;}\n     .__err_tips__      {padding-left: 15px;line-height: 16px;font-size: 11px;color: #333;}\n     .__err_en_tips__   {padding-left: 15px;line-height: 17px;font-size: 9px;color: #888;}\n     .__err_reload__    {text-decoration: none;color: #c00;font-size: 15px}\n     .__err_en_reload__ {text-decoration: none;color: #c00;font-size: 13px}\n     .__err_line__      {margin-left: -5%;width: 95%;border: 1px solid #eee;border-left: none;border-right: none;border-bottom: none;}\n     .__err_item__      {padding:0 15px;line-height:16px;font-size:11px;}\n     .__err_log__       {padding-left:10px;border-left:5px solid #FF5722;color:#FF5722;}\n     .__err_bug__       {color:#333;}\n   ';

  errorNode.innerHTML = '\n     <div class="__err_layer__">\n       <h3 class="__err_title__">ERROR</h3>\n       <p class="__err_tips__">\n          <span>非常抱歉，发生了一些意外，请点击</span>\n          <a class="__err_reload__" href="javascript:location.reload(true)">"重新加载"</a>\n          <span>刷新。</span>\n       </p>\n       <p class="__err_en_tips__">\n          Sorry, somthing accident had happen, <br/>\n          please click\n          <a href="javascript:location.reload(true)">\n            "reload"\n          </a>\n          to refresh.\n       </p>\n       <hr class="__err_line__"/>\n       ' + G.__chorus_debug__.map(function (content, no) {
    return '<p class="__err_item__\n              ' + (G.__chorus_debug__.length - 1 <= no ? '__err_log__' : '__err_bug__') + '">\n              ' + content + '\n           </p>';
  }).join('') + '\n     </div>\n    ';

  if (G.document && G.document.head) {
    G.document.head.appendChild(errorStyle);
  }
  if (G.document && G.document.body) {
    G.document.body.appendChild(errorNode);
  }

  throw content;
};

/**
 * 开启异常捕获
 * @method captureException
 * @for log
 */
var captureException = exports.captureException = log.captureException = function () {
  G.onerror = function () {
    var errMsg = '\n      ' + arguments[0] + '\n      ' + arguments[1] + '\n      ' + arguments[2] + '\n     ';
    errBreak(errMsg);
  };
};

/**
 * 开启日志
 * @method openLog
 * @for log
 * @params {string} type 日志类型
 */
var openLog = exports.openLog = log.openLog = function (type) {
  if (!log['__' + type + '__']) {
    log['__' + type + '__'] = {};
  }
  log['__' + type + '__'].isPrint = true;
};

exports.default = log;