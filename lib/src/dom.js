const dom = new Object();

const standard = {
  attribute: true,
  addClass: true,
  removeClass: true,
  css: true,
  first: true,
  html: true,
  last: true,
  on: true,
  property: true,
  remove: true,
  text: true,
  sibling: true,
  search: true,
  searchAll: true,
};

function nodeListToArray(nodeList) {
  if (typeof nodeList === 'object' && nodeList instanceof Array) {
    return nodeList;
  }
  try {
    nodeList = Array.prototype.slice.call(nodeList);
  } catch (e) {
    const change = [];
    for (let i = 0; i < nodeList.length; i++) {
      change[i] = nodeList[i];
    }
    nodeList = change[i];
  }
  return nodeList;
}

function hasList(n) {
  return typeof n === 'object' && (n instanceof Array || n instanceof NodeList || n instanceof HTMLCollection);
}

standard.dom = {
  single(node) {
    return {
      get lastChild() {
        if (node.children.length > 0) {
          return node.children[node.children.length - 1];
        }
        return null;
      },
      get parent() {
        return node.parentNode;
      },
      get child() {
        return node.children;
      }
    };
  },
  multi(node) {
    return {
      get lastChild() {
        const collect = [];
        node.__map__(n => {
          if (n.children.length > 0) {
            collect.push(n.children[n.children.length - 1]);
          }
        });
        return collect;
      },
      get parent() {
        const collect = [];
        node.__map__(n => {
          if (n.parentNode !== null) {
            collect.push(n.parentNode);
          }
        });
        return collect;
      },
      get child() {
        const collect = [];
        node.__map__(n => {
          if (n.children.length > 0) {
            collect.push(n.children);
          }
        });
        return collect;
      }
    };
  }
};

standard.on = !standard.on ? null : {
  single(node) {
    return (e, cb) => {
      if (typeof e === 'string' && typeof cb === 'function') {
        e = e.split(' ');
        e.map(n => {
          node.addEventListener(n, cb.bind(node), false);
        });
      }else if (typeof e === 'object') {
        for(const n in e){
          node.addEventListener(n, e[n].bind(node), false);
        }
      }
    };
  },
  multi(node) {
    return (e, cb) => {
      node.__map__(n => {
        if (typeof e === 'string' && typeof cb === 'function') {
          e = e.split(' ');
          e.map(en => {
            n.addEventListener(en, cb.bind(n), false);
          });
        }else if (typeof e === 'object') {
          for(const en in e){
            n.addEventListener(en, e[en].bind(n), false);
          }
        }
      });
    };
  }
};

standard.first = !standard.first ? null : {
  single(node) {
    return n => {
      if (node.children.length > 0) {
        if (hasList(n)) {
          for (let i = 0; i < n.length; i++) {
            node.insertBefore(n[i], node.children[0]);
          }
        } else {
          node.insertBefore(n, node.children[0]);
        }
      } else {
        if (hasList(n)) {
          for (let i = 0; i < n.length; i++) {
            node.appendChild(n[i]);
          }
        } else {
          node.appendChild(n);
        }
      }
    };
  }
};

standard.last = !standard.last ? null : {
  single(node) {
    return n => {
      if (typeof n === 'object' && n.nodeType === 1) {
        node.appendChild(n);
      } else if (hasList(n)) {
        n = nodeListToArray(n);
        for (let i = 0; i < n.length; i++) {
          node.appendChild(n[i]);
        }
      }
    };
  }
};

standard.sibling = !standard.sibling ? null : {
  single(node) {
    return n => {
      if (hasList(n)) {
        for (let i = 0; i < n.length; i++) {
          node.parentNode.insertBefore(n[i], node);
        }
      } else {
        node.parentNode.insertBefore(n, node);
      }
    };
  }
};

standard.remove = !standard.remove ? null : {
  single(node) {
    return n => {
      if (typeof n === 'object' && n.nodeType === 1) {
        node.removeChild(n);
      } else {
        node.parentNode && node.parentNode.removeChild(node);
      }
    };
  },
  multi(node) {
    return z => {
      node.__map__(n => {
        if (typeof z === 'object' && z.nodeType === 1) {
          n.removeChild(z);
        } else {
          n.parentNode && n.parentNode.removeChild(n);
        }
      });
    };
  }
};

standard.search = !standard.search ? null : {
  single(node) {
    return css => {
      return nodeListToArray(node.querySelector(css));
    };
  },
  multi(node) {
    return css => {
      let collect = [];
      node.__map__(n => {
        let nodeList = n.querySelector(css);
        nodeList = nodeListToArray(nodeList);
        if (nodeList !== null && nodeList.length > 0) {
          collect = collect.concat(nodeList);
        }
      });
      return collect;
    };
  }
};

standard.searchAll = !standard.searchAll ? null : {
  single(node) {
    return css => {
      return nodeListToArray(node.querySelectorAll(css));
    };
  },
  multi(node) {
    return css => {
      let collect = [];
      node.__map__(n => {
        let nodeList = n.querySelectorAll(css);
        if (nodeList !== null && nodeList.length > 0) {
          nodeList = nodeListToArray(nodeList);
          collect = collect.concat(nodeList);
        }
      });
      return collect;
    };
  }
};

standard.css = !standard.css ? null : {
  single(node) {
    return sy => {
      for(const k in sy){
        node.style[k] = sy[k];
      }
    };
  },
  multi(node) {
    return sy => {
      node.__map__(n => {
        for(const k in sy){
          n.style[k] = sy[k];
        }
      });
    };
  }
};

standard.property = !standard.property ? null : {
  single(node) {
    return pro => {
      for(const k in pro){
        if (pro.hasOwnProperty(k)) {
          s[k] = pro[k];
        }
      }
    };
  },
  multi(node) {
    return pro => {
      node.__map__(n => {
        for(const k in pro){
          if (pro.hasOwnProperty(k)) {
            s[k] = pro[k];
          }
        }
      });
    };
  }
};

standard.attribute = !standard.attribute ? null : {
  single(node) {
    return attr => {
      for(const k in attr){
        if (attr.hasOwnProperty(k)) {
          node.setAttribute(k, attr[k]);
        }
      }
    };
  },
  multi(node) {
    return node => {
      node.__map__(n => {
        for(const k in attr){
          if (attr.hasOwnProperty(k)) {
            n.setAttribute(k, attr[k]);
          }
        }
      });
    };
  }
};

standard.addClass = !standard.addClass ? null : {
  single(node) {
    return name => {
      let allClassName = node.className.split(' ');

      if(typeof name === 'string'){
        allClassName.push(name);
      }else if(name instanceof Array){
        allClassName = allClassName.concat(name);
      }

      node.className = allClassName.join(' ');
    };
  },
  multi(node){
    return name => {
      node.__map__(n => {
        let allClassName = node.className.split(' ');

        if(typeof name === 'string'){
          allClassName.push(name);
        }else if(name instanceof Array){
          allClassName = allClassName.concat(name);
        }

        node.className = allClassName.join(' ');
      });
    };
  }
};

standard.removeClass = !standard.removeClass ? null : {
  single(node) {
    return name => {
      const allClassName = node.className.split(' ');
      const newClassName = [];

      allClassName.map(nstr =>{
        if(typeof name === 'string' && nstr !== name){
          newClassName.push(nstr);
        }else if(name instanceof Array && name.indexOf(nstr) < 0){
          newClassName.push(nstr);
        }
      });

      node.className = newClassName.join(' ');
    };
  },
  multi(node){
    return name => {
      node.__map__(n => {
        const allClassName = n.className.split(' ');
        const newClassName = [];

        allClassName.map(nstr =>{
          if(nstr !== name){
            newClassName.push(nstr);
          }else if(name instanceof Array && name.indexOf(nstr) < 0){
            newClassName.push(nstr);
          }
        });

        n.className = newClassName.join(' ');
      });
    };
  }
};

standard.html = !standard.html ? null : {
  single(node) {
    return content => {
      node.innerHTML = content;
    };
  },
  multi(node) {
    return content => {
      node.__map__(n => {
        n.innerHTML = content;
      });
    };
  }
};

standard.text = !standard.text ? null : {
  single(node) {
    return content => {
      node.innerText = content;
    };
  },
  multi(node) {
    return content => {
      node.__map__(n => {
        n.innerText = content;
      });
    };
  }
};

for(const methodName in standard){
  if (standard[methodName] === null) {
    delete standard[methodName];
  }
}

function domMethods(node){
  const model = hasList(node) ? 'multi' : 'single';

  if(!standard.dom.hasOwnProperty(model)){
    return null;
  }

  const shell = standard.dom[model](node);

  for(const methodName in standard){
    const target = standard[methodName];
    if(target.hasOwnProperty(model)){
      shell[methodName] = target[model](node);
    }
  }

  return shell;
}

function domMethodExtends(ns){
  ns.$$.extends = obj => {
    for(const methodName in obj){
      if(!standard.hasOwnProperty(methodName)){
        ns.$$[methodName] = obj[methodName];
      }else{
        throw `Extend method ${methodName} clashed`;
      }
    }
  };

  ns.$$.extends({
    state: {},
    initState(data){
      this.state = data;
      this.__s__ = data;
    },
    setState(n,k){
      for(const ky in this.__s__){
        this.state[ky] = this.__s__[ky];
      }
      if(this.state.hasOwnProperty(n)){
        this.state[n] = k;
        this.__s__[n] = k;
      }
    }
  });
}

/**
 * 简易dom对象处理, 仅针对创建dom对象的封装
 * @method build
 * @for dom
 * @params {string} con
 */
export const buildDOM = dom.buildDOM = con => {
  if (con === null || typeof con === 'object' && con.$$) {
    return con;
  }

  let ns;

  if(typeof con === 'object' && con.nodeType === 1){
    ns = con;
  } else if(typeof con === 'string' && /^(<[^\/\<\>]+>){1}$/.test(con)){
    ns = document.createElement('div');
    ns.innerHTML = con;
    ns = ns.children[0];
  } else {
    return null;
  }

  ns.$$ = domMethods(ns);

  domMethodExtends(ns);

  return ns;
};

/**
 * 简易dom对象处理, 仅针对多个dom对象的封装
 * @method gartherDOM
 * @for dom
 * @params {object,array} con
 */
export const gartherDOM = dom.gartherDOM = con => {
  if (con === null || typeof con === 'object' && con.$$) {
    return con;
  }

  let ns;

  if (typeof con === 'object' && con instanceof Array) {
    const parent = buildDOM('<div>');

    con.map(n => {
      if(typeof n === 'object' && n.nodeType === 1){
        parent.$$.last(n);
      }
    });

    ns = parent.$$.child;
  } else if (typeof con !== 'object' || !con.length || !con instanceof NodeList || !con instanceof HTMLCollection) {
    return null;
  } else {
    ns = con;
  }

  ns.__map__ = cb => {
    for (let i = 0; i < ns.length; i++) {
      cb(ns[i], i);
    }
  };

  ns.$$ = domMethods(ns);

  domMethodExtends(ns);

  return ns;
};

/**
 * 简易dom对象处理, 查找单个节点
 * @method searchDOM
 * @for dom
 * @params {string} con
 */
export const searchDOM = dom.searchDOM = str => {
  return dom.buildDOM(document.querySelector(str));
};

/**
 * 简易dom对象处理, 查找多个节点
 * @method searchDOM
 * @for dom
 * @params {string} con
 */
export const searchGartherDOM = dom.searchGartherDOM = str => {
  return dom.gartherDOM(document.querySelectorAll(str));
};

export default dom;
