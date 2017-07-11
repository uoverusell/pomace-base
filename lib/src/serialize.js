import { debug } from './log'

const serialize = new Object();

/**
 * 简易通用队列, start -> process -> process -> process
 * @method squence
 * @for serialize
 * @params {object} target 队列内容
 */
export const sequence = serialize.sequence = (target = [])=>{
   const list = [];
   const run = {};

   run.__count__ = 0;
   run.__pass__ = null;
   run.__outset__ = null;

   run.__continue__ = ()=>{
     if(run.__count__ >= list.length - 1){
       return;
     }

     let doth = list[++run.__count__];

     if(doth.__seqName__ === run.__pass__){
       debug(`[sequence] pass ${doth.__seqName__}`);
       run.__count__++;
       run.__pass__ = null;
       doth = list[run.__count__];
     }

     debug(`[sequence] doth ${doth.__seqName__}`);

     run.__count__ < list.length? doth(run.__outset__):null;
   };

   run.pass = (n)=>{
     run.__pass__ = n;
   };

   run.begin = (params={})=>{
     run.__count__ = 0;
     params['next'] = run.__continue__;
     params['pass'] = run.pass;
     run.__outset__ = params;

     const doth = list[run.__count__];

     if(typeof doth !== 'function'){
       errBreak('sequence execute must a function');
       return;
     }

     debug(`[sequence] doth ${doth.__seqName__}`);
     doth(run.__outset__);
   };

   for(let i=0;i<target.length;i++){
     if(typeof target[i].doth !== 'function'){
       target[i].doth = function(){
         run.__continue__();
       };
     }
     const doth = function(){
       target[i].doth.apply(target[i], arguments);
     };
     doth.__seqName__ = target[i].key;
     list.push(doth);
   }

   return run;
};

/**
 * 单列
 * @method singleton
 * @for serialize
 * @params {function} callback
 */
export const singleton = serialize.singleton = (key,callback = new Function()) => {
  const g = window;

  if(!g.__pomace_serialize_singleton__){
    g.__pomace_serialize_singleton__ = {};
  }else if(g.__pomace_serialize_singleton__.hasOwnProperty(key)){
    return g.__pomace_serialize_singleton_[key];
  }

  return callback();
}

export default serialize;
