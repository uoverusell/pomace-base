'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clock = new Object();

/**
 * 简易日期转化
 * @method format
 * @for clock
 * @params {string} format
 * @params {string,number} time
 */
var dateFormat = exports.dateFormat = clock.dateFormat = function () {
  var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '{yyyy}/{mm}/{dd} {hh}:{ii}:{ss}';
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date().getTime();

  var de = new Date(date);
  var yyyy = de.getFullYear();
  var m = de.getMonth() + 1;
  var d = de.getDate();
  var h = de.getHours();
  var i = de.getMinutes();
  var s = de.getSeconds();

  var mm = m;
  var dd = d;
  var hh = h;
  var ii = i;
  var ss = s;

  if (m < 10) {
    mm = '0' + m;
  }

  if (d < 10) {
    dd = '0' + d;
  }

  if (h < 10) {
    hh = '0' + h;
  }

  if (i < 10) {
    ii = '0' + i;
  }

  if (s < 10) {
    ss = '0' + s;
  }

  format = format.replace(/\{yyyy\}/g, yyyy);
  format = format.replace(/\{mm\}/g, mm);
  format = format.replace(/\{dd\}/g, dd);
  format = format.replace(/\{hh\}/g, hh);
  format = format.replace(/\{ii\}/g, ii);
  format = format.replace(/\{ss\}/g, ss);

  return format;
};

var now = clock.now = function (type) {
  switch (type) {
    case 'year':
      return new Date().getFullYear();
    case 'month':
      return new Date().getMonth() + 1;
    default:
      return new Date().getDate();
  }
};

exports.default = clock;