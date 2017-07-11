'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var dom = new Object();

var standard = {
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
  searchAll: true
};

function nodeListToArray(nodeList) {
  if ((typeof nodeList === 'undefined' ? 'undefined' : _typeof(nodeList)) === 'object' && nodeList instanceof Array) {
    return nodeList;
  }
  try {
    nodeList = Array.prototype.slice.call(nodeList);
  } catch (e) {
    var change = [];
    for (var _i = 0; _i < nodeList.length; _i++) {
      change[_i] = nodeList[_i];
    }
    nodeList = change[i];
  }
  return nodeList;
}

function hasList(n) {
  return (typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object' && (n instanceof Array || n instanceof NodeList || n instanceof HTMLCollection);
}

standard.dom = {
  single: function single(node) {
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
  multi: function multi(node) {
    return {
      get lastChild() {
        var collect = [];
        node.__map__(function (n) {
          if (n.children.length > 0) {
            collect.push(n.children[n.children.length - 1]);
          }
        });
        return collect;
      },
      get parent() {
        var collect = [];
        node.__map__(function (n) {
          if (n.parentNode !== null) {
            collect.push(n.parentNode);
          }
        });
        return collect;
      },
      get child() {
        var collect = [];
        node.__map__(function (n) {
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
  single: function single(node) {
    return function (e, cb) {
      if (typeof e === 'string' && typeof cb === 'function') {
        e = e.split(' ');
        e.map(function (n) {
          node.addEventListener(n, cb.bind(node), false);
        });
      } else if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object') {
        for (var n in e) {
          node.addEventListener(n, e[n].bind(node), false);
        }
      }
    };
  },
  multi: function multi(node) {
    return function (e, cb) {
      node.__map__(function (n) {
        if (typeof e === 'string' && typeof cb === 'function') {
          e = e.split(' ');
          e.map(function (en) {
            n.addEventListener(en, cb.bind(n), false);
          });
        } else if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object') {
          for (var en in e) {
            n.addEventListener(en, e[en].bind(n), false);
          }
        }
      });
    };
  }
};

standard.first = !standard.first ? null : {
  single: function single(node) {
    return function (n) {
      if (node.children.length > 0) {
        if (hasList(n)) {
          for (var _i2 = 0; _i2 < n.length; _i2++) {
            node.insertBefore(n[_i2], node.children[0]);
          }
        } else {
          node.insertBefore(n, node.children[0]);
        }
      } else {
        if (hasList(n)) {
          for (var _i3 = 0; _i3 < n.length; _i3++) {
            node.appendChild(n[_i3]);
          }
        } else {
          node.appendChild(n);
        }
      }
    };
  }
};

standard.last = !standard.last ? null : {
  single: function single(node) {
    return function (n) {
      if ((typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object' && n.nodeType === 1) {
        node.appendChild(n);
      } else if (hasList(n)) {
        n = nodeListToArray(n);
        for (var _i4 = 0; _i4 < n.length; _i4++) {
          node.appendChild(n[_i4]);
        }
      }
    };
  }
};

standard.sibling = !standard.sibling ? null : {
  single: function single(node) {
    return function (n) {
      if (hasList(n)) {
        for (var _i5 = 0; _i5 < n.length; _i5++) {
          node.parentNode.insertBefore(n[_i5], node);
        }
      } else {
        node.parentNode.insertBefore(n, node);
      }
    };
  }
};

standard.remove = !standard.remove ? null : {
  single: function single(node) {
    return function (n) {
      if ((typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object' && n.nodeType === 1) {
        node.removeChild(n);
      } else {
        node.parentNode && node.parentNode.removeChild(node);
      }
    };
  },
  multi: function multi(node) {
    return function (z) {
      node.__map__(function (n) {
        if ((typeof z === 'undefined' ? 'undefined' : _typeof(z)) === 'object' && z.nodeType === 1) {
          n.removeChild(z);
        } else {
          n.parentNode && n.parentNode.removeChild(n);
        }
      });
    };
  }
};

standard.search = !standard.search ? null : {
  single: function single(node) {
    return function (css) {
      return nodeListToArray(node.querySelector(css));
    };
  },
  multi: function multi(node) {
    return function (css) {
      var collect = [];
      node.__map__(function (n) {
        var nodeList = n.querySelector(css);
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
  single: function single(node) {
    return function (css) {
      return nodeListToArray(node.querySelectorAll(css));
    };
  },
  multi: function multi(node) {
    return function (css) {
      var collect = [];
      node.__map__(function (n) {
        var nodeList = n.querySelectorAll(css);
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
  single: function single(node) {
    return function (sy) {
      for (var k in sy) {
        node.style[k] = sy[k];
      }
    };
  },
  multi: function multi(node) {
    return function (sy) {
      node.__map__(function (n) {
        for (var k in sy) {
          n.style[k] = sy[k];
        }
      });
    };
  }
};

standard.property = !standard.property ? null : {
  single: function single(node) {
    return function (pro) {
      for (var k in pro) {
        if (pro.hasOwnProperty(k)) {
          s[k] = pro[k];
        }
      }
    };
  },
  multi: function multi(node) {
    return function (pro) {
      node.__map__(function (n) {
        for (var k in pro) {
          if (pro.hasOwnProperty(k)) {
            s[k] = pro[k];
          }
        }
      });
    };
  }
};

standard.attribute = !standard.attribute ? null : {
  single: function single(node) {
    return function (attr) {
      for (var k in attr) {
        if (attr.hasOwnProperty(k)) {
          node.setAttribute(k, attr[k]);
        }
      }
    };
  },
  multi: function multi(node) {
    return function (node) {
      node.__map__(function (n) {
        for (var k in attr) {
          if (attr.hasOwnProperty(k)) {
            n.setAttribute(k, attr[k]);
          }
        }
      });
    };
  }
};

standard.addClass = !standard.addClass ? null : {
  single: function single(node) {
    return function (name) {
      var allClassName = node.className.split(' ');

      if (typeof name === 'string') {
        allClassName.push(name);
      } else if (name instanceof Array) {
        allClassName = allClassName.concat(name);
      }

      node.className = allClassName.join(' ');
    };
  },
  multi: function multi(node) {
    return function (name) {
      node.__map__(function (n) {
        var allClassName = node.className.split(' ');

        if (typeof name === 'string') {
          allClassName.push(name);
        } else if (name instanceof Array) {
          allClassName = allClassName.concat(name);
        }

        node.className = allClassName.join(' ');
      });
    };
  }
};

standard.removeClass = !standard.removeClass ? null : {
  single: function single(node) {
    return function (name) {
      var allClassName = node.className.split(' ');
      var newClassName = [];

      allClassName.map(function (nstr) {
        if (typeof name === 'string' && nstr !== name) {
          newClassName.push(nstr);
        } else if (name instanceof Array && name.indexOf(nstr) < 0) {
          newClassName.push(nstr);
        }
      });

      node.className = newClassName.join(' ');
    };
  },
  multi: function multi(node) {
    return function (name) {
      node.__map__(function (n) {
        var allClassName = n.className.split(' ');
        var newClassName = [];

        allClassName.map(function (nstr) {
          if (nstr !== name) {
            newClassName.push(nstr);
          } else if (name instanceof Array && name.indexOf(nstr) < 0) {
            newClassName.push(nstr);
          }
        });

        n.className = newClassName.join(' ');
      });
    };
  }
};

standard.html = !standard.html ? null : {
  single: function single(node) {
    return function (content) {
      node.innerHTML = content;
    };
  },
  multi: function multi(node) {
    return function (content) {
      node.__map__(function (n) {
        n.innerHTML = content;
      });
    };
  }
};

standard.text = !standard.text ? null : {
  single: function single(node) {
    return function (content) {
      node.innerText = content;
    };
  },
  multi: function multi(node) {
    return function (content) {
      node.__map__(function (n) {
        n.innerText = content;
      });
    };
  }
};

for (var methodName in standard) {
  if (standard[methodName] === null) {
    delete standard[methodName];
  }
}

function domMethods(node) {
  var model = hasList(node) ? 'multi' : 'single';

  if (!standard.dom.hasOwnProperty(model)) {
    return null;
  }

  var shell = standard.dom[model](node);

  for (var _methodName in standard) {
    var target = standard[_methodName];
    if (target.hasOwnProperty(model)) {
      shell[_methodName] = target[model](node);
    }
  }

  return shell;
}

function domMethodExtends(ns) {
  ns.$$.extends = function (obj) {
    for (var _methodName2 in obj) {
      if (!standard.hasOwnProperty(_methodName2)) {
        ns.$$[_methodName2] = obj[_methodName2];
      } else {
        throw 'Extend method ' + _methodName2 + ' clashed';
      }
    }
  };

  ns.$$.extends({
    state: {},
    initState: function initState(data) {
      this.state = data;
      this.__s__ = data;
    },
    setState: function setState(n, k) {
      for (var ky in this.__s__) {
        this.state[ky] = this.__s__[ky];
      }
      if (this.state.hasOwnProperty(n)) {
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
var buildDOM = exports.buildDOM = dom.buildDOM = function (con) {
  if (con === null || (typeof con === 'undefined' ? 'undefined' : _typeof(con)) === 'object' && con.$$) {
    return con;
  }

  var ns = void 0;

  if ((typeof con === 'undefined' ? 'undefined' : _typeof(con)) === 'object' && con.nodeType === 1) {
    ns = con;
  } else if (typeof con === 'string' && /^(<[^\/\<\>]+>){1}$/.test(con)) {
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
var gartherDOM = exports.gartherDOM = dom.gartherDOM = function (con) {
  if (con === null || (typeof con === 'undefined' ? 'undefined' : _typeof(con)) === 'object' && con.$$) {
    return con;
  }

  var ns = void 0;

  if ((typeof con === 'undefined' ? 'undefined' : _typeof(con)) === 'object' && con instanceof Array) {
    (function () {
      var parent = buildDOM('<div>');

      con.map(function (n) {
        if ((typeof n === 'undefined' ? 'undefined' : _typeof(n)) === 'object' && n.nodeType === 1) {
          parent.$$.last(n);
        }
      });

      ns = parent.$$.child;
    })();
  } else if ((typeof con === 'undefined' ? 'undefined' : _typeof(con)) !== 'object' || !con.length || !con instanceof NodeList || !con instanceof HTMLCollection) {
    return null;
  } else {
    ns = con;
  }

  ns.__map__ = function (cb) {
    for (var _i6 = 0; _i6 < ns.length; _i6++) {
      cb(ns[_i6], _i6);
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
var searchDOM = exports.searchDOM = dom.searchDOM = function (str) {
  return dom.buildDOM(document.querySelector(str));
};

/**
 * 简易dom对象处理, 查找多个节点
 * @method searchDOM
 * @for dom
 * @params {string} con
 */
var searchGartherDOM = exports.searchGartherDOM = dom.searchGartherDOM = function (str) {
  return dom.gartherDOM(document.querySelectorAll(str));
};

exports.default = dom;