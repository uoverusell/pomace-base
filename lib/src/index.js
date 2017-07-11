/*！
 * pomace base javascript library
 * pomace base - v0.1.0 (2016-07-30)
 */

import log from './log';
import dom from './dom';
import clock from './clock';
import serialize from './serialize';

export const captureException = log.captureException;
export const debug = log.debug;
export const openLog = log.openLog;
export const errBreak = log.errBreak;
export const buildDOM = dom.buildDOM;
export const gartherDOM = dom.gartherDOM;
export const searchDOM = dom.searchDOM;
export const searchGartherDom = dom.searchGartherDOM;
export const dateFormate = clock.dateFormat;
export const now = clock.now;
export const sequence = serialize.sequence;
export const singleton = serialize.singleton;

export default {
  log,
  dom,
  clock,
  serialize,
};
