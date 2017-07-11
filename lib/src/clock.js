const clock = new Object();

/**
 * 简易日期转化
 * @method format
 * @for clock
 * @params {string} format
 * @params {string,number} time
 */
export const dateFormat = clock.dateFormat = (format = '{yyyy}/{mm}/{dd} {hh}:{ii}:{ss}', date = new Date().getTime()) => {
  const de = new Date(date);
  const yyyy = de.getFullYear();
  const m = de.getMonth() + 1;
  const d = de.getDate();
  const h = de.getHours();
  const i = de.getMinutes();
  const s = de.getSeconds();

  let mm = m;
  let dd = d;
  let hh = h;
  let ii = i;
  let ss = s;

  if (m < 10) {
    mm = `0${ m }`;
  }

  if (d < 10) {
    dd = `0${ d }`;
  }

  if (h < 10) {
    hh = `0${ h }`;
  }

  if (i < 10) {
    ii = `0${ i }`;
  }

  if (s < 10) {
    ss = `0${ s }`;
  }

  format = format.replace(/\{yyyy\}/g, yyyy);
  format = format.replace(/\{mm\}/g, mm);
  format = format.replace(/\{dd\}/g, dd);
  format = format.replace(/\{hh\}/g, hh);
  format = format.replace(/\{ii\}/g, ii);
  format = format.replace(/\{ss\}/g, ss);

  return format;
};  

const now = clock.now = (type) => {
  switch(type){
    case 'year':
     return (new Date()).getFullYear();
    case 'month':
     return (new Date()).getMonth() + 1;
    default:
     return (new Date()).getDate();
  }
};

export default clock;
