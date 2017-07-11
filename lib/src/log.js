import { dateFormat } from './clock';

const G = window;
const log = new Object();

/**
 * 日志输出，日志内容在抛出异常时会全部被打印浏览器内，通常在console会显示。
 * @method debug
 * @for log
 * @params {string} content 日志内容
 */
export const debug = log.debug = content => {
  if (!G.__chorus_debug__) {
    G.__chorus_debug__ = [];
  }

  content = `${ dateFormat() } | ${ content }`;

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
export const errBreak = log.errBreak = content => {
  if (!G.__chorus_debug__) {
    G.__chorus_debug__ = [];
  }

  content = `${ dateFormat() } | error | ${ content }`;

  G.__chorus_debug__.push(content);

  if (typeof G.handleError === 'function') {
    G.handleError(content);
  }

  if (!log.__error__ || !log.__error__.isPrint) {
    return;
  }

  const errorNode = document.createElement('div');
  const errorStyle = document.createElement('style');

  errorStyle.innerHTML = `
     .__err_layer__     {position: absolute;z-index: 99999999999999999;top: 0;left: 0;width: 100%;height: 100%;opacity: 0.5%;background-color: #fff;}
     .__err_layer__ p   {margin-top: 10px;margin-bottom: 10px;}
     .__err_title__     {padding-top: 15px;padding-left: 15px;color: #c00;}
     .__err_tips__      {padding-left: 15px;line-height: 16px;font-size: 11px;color: #333;}
     .__err_en_tips__   {padding-left: 15px;line-height: 17px;font-size: 9px;color: #888;}
     .__err_reload__    {text-decoration: none;color: #c00;font-size: 15px}
     .__err_en_reload__ {text-decoration: none;color: #c00;font-size: 13px}
     .__err_line__      {margin-left: -5%;width: 95%;border: 1px solid #eee;border-left: none;border-right: none;border-bottom: none;}
     .__err_item__      {padding:0 15px;line-height:16px;font-size:11px;}
     .__err_log__       {padding-left:10px;border-left:5px solid #FF5722;color:#FF5722;}
     .__err_bug__       {color:#333;}
   `;

  errorNode.innerHTML = `
     <div class="__err_layer__">
       <h3 class="__err_title__">ERROR</h3>
       <p class="__err_tips__">
          <span>非常抱歉，发生了一些意外，请点击</span>
          <a class="__err_reload__" href="javascript:location.reload(true)">"重新加载"</a>
          <span>刷新。</span>
       </p>
       <p class="__err_en_tips__">
          Sorry, somthing accident had happen, <br/>
          please click
          <a href="javascript:location.reload(true)">
            "reload"
          </a>
          to refresh.
       </p>
       <hr class="__err_line__"/>
       ${ G.__chorus_debug__.map((content, no) => {
          return `<p class="__err_item__
              ${ G.__chorus_debug__.length - 1 <= no ? '__err_log__' : '__err_bug__' }">
              ${ content }
           </p>`;
          }).join('')
        }
     </div>
    `;

  if(G.document && G.document.head){
    G.document.head.appendChild(errorStyle);
  }
  if(G.document && G.document.body) {
    G.document.body.appendChild(errorNode);
  }

  throw content;
};

/**
 * 开启异常捕获
 * @method captureException
 * @for log
 */
export const captureException = log.captureException = () => {
  G.onerror = function () {
    const errMsg = `
      ${ arguments[0] }
      ${ arguments[1] }
      ${ arguments[2] }
     `;
    errBreak(errMsg);
  };
};

/**
 * 开启日志
 * @method openLog
 * @for log
 * @params {string} type 日志类型
 */
export const openLog = log.openLog = type => {
  if(!log[`__${type}__`]){
    log[`__${type}__`] = {};
  }
  log[`__${type}__`].isPrint = true;
};

export default log;
