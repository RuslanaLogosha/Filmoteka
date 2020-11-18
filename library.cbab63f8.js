// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./../images/header-bg-main-mobile.jpg":[["header-bg-main-mobile.71b6a31c.jpg","images/header-bg-main-mobile.jpg"],"images/header-bg-main-mobile.jpg"],"./../images/header-bg-main-mobile@2x.jpg":[["header-bg-main-mobile@2x.afb557df.jpg","images/header-bg-main-mobile@2x.jpg"],"images/header-bg-main-mobile@2x.jpg"],"./../images/header-bg-main-tablet.jpg":[["header-bg-main-tablet.310b555c.jpg","images/header-bg-main-tablet.jpg"],"images/header-bg-main-tablet.jpg"],"./../images/header-bg-main-desktop.jpg":[["header-bg-main-desktop.0c233672.jpg","images/header-bg-main-desktop.jpg"],"images/header-bg-main-desktop.jpg"],"./../images/header-bg-lib-mobile.jpg":[["header-bg-lib-mobile.5145fa34.jpg","images/header-bg-lib-mobile.jpg"],"images/header-bg-lib-mobile.jpg"],"./../images/header-bg-lib-mobile@2x.jpg":[["header-bg-lib-mobile@2x.0d738ecb.jpg","images/header-bg-lib-mobile@2x.jpg"],"images/header-bg-lib-mobile@2x.jpg"],"./../images/header-bg-lib-tablet.jpg":[["header-bg-lib-tablet.03f0847c.jpg","images/header-bg-lib-tablet.jpg"],"images/header-bg-lib-tablet.jpg"],"./../images/header-bg-lib-desktop.jpg":[["header-bg-lib-desktop.ecf5eb53.jpg","images/header-bg-lib-desktop.jpg"],"images/header-bg-lib-desktop.jpg"],"./../images/header-bg-modal-mobile.jpg":[["header-bg-modal-mobile.22f8232e.jpg","images/header-bg-modal-mobile.jpg"],"images/header-bg-modal-mobile.jpg"],"./../images/header-bg-modal-mobile@2x.jpg":[["header-bg-modal-mobile@2x.db48d55b.jpg","images/header-bg-modal-mobile@2x.jpg"],"images/header-bg-modal-mobile@2x.jpg"],"./../images/header-bg-modal-tablet.jpg":[["header-bg-modal-tablet.f7cd343a.jpg","images/header-bg-modal-tablet.jpg"],"images/header-bg-modal-tablet.jpg"],"./../images/header-bg-modal-desktop.jpg":[["header-bg-modal-desktop.8a7384dd.jpg","images/header-bg-modal-desktop.jpg"],"images/header-bg-modal-desktop.jpg"],"./../images/pagination/arrow-left.svg":[["arrow-left.62ff9ef7.svg","images/pagination/arrow-left.svg"],"images/pagination/arrow-left.svg"],"./../images/pagination/arrow-right.svg":[["arrow-right.f04d22a6.svg","images/pagination/arrow-right.svg"],"images/pagination/arrow-right.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/basiclightbox/dist/basicLightbox.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).basicLightbox=e()}}((function(){return function e(n,t,o){function r(c,u){if(!t[c]){if(!n[c]){var s="function"==typeof require&&require;if(!u&&s)return s(c,!0);if(i)return i(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var l=t[c]={exports:{}};n[c][0].call(l.exports,(function(e){return r(n[c][1][e]||e)}),l,l.exports,e,n,t,o)}return t[c].exports}for(var i="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.visible=void 0;var o=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=document.createElement("div");return t.innerHTML=e.trim(),!0===n?t.children:t.firstChild},r=function(e,n){var t=e.children;return 1===t.length&&t[0].tagName===n},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};t.visible=i;t.create=function(e,n){var t=function(e,n){var t=o('\n\t\t<div class="basicLightbox '.concat(n.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=t.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return i.appendChild(e)}));var c=r(i,"IMG"),u=r(i,"VIDEO"),s=r(i,"IFRAME");return!0===c&&t.classList.add("basicLightbox--img"),!0===u&&t.classList.add("basicLightbox--video"),!0===s&&t.classList.add("basicLightbox--iframe"),t}(e=function(e){var n="string"==typeof e,t=e instanceof HTMLElement==!0;if(!1===n&&!1===t)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(n)),c=function(e){return!1!==n.onClose(u)&&function(e,n){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===i(e)||e.parentElement.removeChild(e),n()}),410),!0}(t,(function(){if("function"==typeof e)return e(u)}))};!0===n.closable&&t.addEventListener("click",(function(e){e.target===t&&c()}));var u={element:function(){return t},visible:function(){return i(t)},show:function(e){return!1!==n.onShow(u)&&function(e,n){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),n()}))}),10),!0}(t,(function(){if("function"==typeof e)return e(u)}))},close:c};return u}},{}]},{},[1])(1)}));
},{}],"images/team-ruslana.jpeg":[function(require,module,exports) {
module.exports = "/team-ruslana.5ee08793.jpeg";
},{}],"images/team-olga.jpg":[function(require,module,exports) {
module.exports = "/team-olga.00cc36e9.jpg";
},{}],"images/team-daria.jpeg":[function(require,module,exports) {
module.exports = "/team-daria.ee65a5d2.jpeg";
},{}],"images/team-denis.jpeg":[function(require,module,exports) {
module.exports = "/team-denis.0a5b0591.jpeg";
},{}],"images/team-ihor.jpg":[function(require,module,exports) {
module.exports = "/team-ihor.ab333400.jpg";
},{}],"images/team-katya.jpg":[function(require,module,exports) {
module.exports = "/team-katya.af4ea0b4.jpg";
},{}],"images/team-vladymyr.jpeg":[function(require,module,exports) {
module.exports = "/team-vladymyr.bc76483f.jpeg";
},{}],"images/team-aleksandr.jpg":[function(require,module,exports) {
module.exports = "/team-aleksandr.cfd8cc78.jpg";
},{}],"images/sprite.svg":[function(require,module,exports) {
module.exports = "/sprite.5ec50489.svg";
},{}],"js/teamLightbox.js":[function(require,module,exports) {
"use strict";

var basicLightbox = _interopRequireWildcard(require("basiclightbox"));

var _teamRuslana = _interopRequireDefault(require("../images/team-ruslana.jpeg"));

var _teamOlga = _interopRequireDefault(require("../images/team-olga.jpg"));

var _teamDaria = _interopRequireDefault(require("../images/team-daria.jpeg"));

var _teamDenis = _interopRequireDefault(require("../images/team-denis.jpeg"));

var _teamIhor = _interopRequireDefault(require("../images/team-ihor.jpg"));

var _teamKatya = _interopRequireDefault(require("../images/team-katya.jpg"));

var _teamVladymyr = _interopRequireDefault(require("../images/team-vladymyr.jpeg"));

var _teamAleksandr = _interopRequireDefault(require("../images/team-aleksandr.jpg"));

var _sprite = _interopRequireDefault(require("../images/sprite.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var markup = "<div class=\"team-wrapper\"><div class=\"team-card\">\n    <img src=\"".concat(_teamRuslana.default, "\" alt=\"Ruslana\" class=\"team-image\">\n    <p class=\"team-name\">Ruslana</p>\n    <p class=\"team-role\">Team Leader</p>\n    <a href=\"https://github.com/RuslanaLogosha\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div>\n<div class=\"team-card\">\n    <img src=\"").concat(_teamOlga.default, "\" alt=\"Olga\" class=\"team-image\">\n    <p class=\"team-name\">Olga</p>\n    <p class=\"team-role\">Scrum Master</p>\n    <a href=\"https://github.com/levshukova\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div>\n<div class=\"team-card\">\n    <img src=\"").concat(_teamDaria.default, "\" alt=\"Daria\" class=\"team-image\">\n    <p class=\"team-name\">Daria</p>\n    <p class=\"team-role\">Developer</p>\n    <a href=\"https://github.com/Daria-Churkina\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div>\n<div class=\"team-card\">\n    <img src=\"").concat(_teamDenis.default, "\" alt=\"Denis\" class=\"team-image\">\n    <p class=\"team-name\">Denis</p>\n    <p class=\"team-role\">Developer</p>\n    <a href=\"https://github.com/\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div>\n<div class=\"team-card\">\n    <img src=\"").concat(_teamIhor.default, "\" alt=\"Ihor\" class=\"team-image\">\n    <p class=\"team-name\">Ihor</p>\n    <p class=\"team-role\">Developer</p>\n    <a href=\"https://github.com/taraiihor\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div>\n<div class=\"team-card\">\n    <img src=\"").concat(_teamKatya.default, "\" alt=\"Katya\" class=\"team-image\">\n    <p class=\"team-name\">Katya</p>\n    <p class=\"team-role\">Developer</p>\n    <a href=\"https://github.com/Kateryna-Urbanovych\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div>\n<div class=\"team-card\">\n    <img src=\"").concat(_teamVladymyr.default, "\" alt=\"Vladymyr\" class=\"team-image\">\n    <p class=\"team-name\">Vladymyr</p>\n    <p class=\"team-role\">Developer</p>\n    <a href=\"https://github.com/created-with-love\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div>\n<div class=\"team-card\">\n    <img src=\"").concat(_teamAleksandr.default, "\" alt=\"Aleksandr\" class=\"team-image\">\n    <p class=\"team-name\">Aleksandr</p>\n    <p class=\"team-role\">Developer</p>\n    <a href=\"https://github.com/AleksMkm\" target=\"_blank\" class=\"team-git\"><svg class=\"logo__icon\" width=\"24\" height=\"24\">\n      <use href=\"").concat(_sprite.default, "#github\"></use>\n    </svg></a>\n</div></div>");
var container = document.querySelector('.js-team-modal');
var markup2 = "<img src=\"".concat(_teamKatya.default, "\"/>");
container.addEventListener('click', openModal);

function teamModalWindow(data) {
  return basicLightbox.create(data);
}

function openModal(e) {
  teamModalWindow(markup).show();
}
},{"basiclightbox":"../node_modules/basiclightbox/dist/basicLightbox.min.js","../images/team-ruslana.jpeg":"images/team-ruslana.jpeg","../images/team-olga.jpg":"images/team-olga.jpg","../images/team-daria.jpeg":"images/team-daria.jpeg","../images/team-denis.jpeg":"images/team-denis.jpeg","../images/team-ihor.jpg":"images/team-ihor.jpg","../images/team-katya.jpg":"images/team-katya.jpg","../images/team-vladymyr.jpeg":"images/team-vladymyr.jpeg","../images/team-aleksandr.jpg":"images/team-aleksandr.jpg","../images/sprite.svg":"images/sprite.svg"}],"../node_modules/basiclightbox/dist/basicLightbox.min.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"library.js":[function(require,module,exports) {
"use strict";

require("./sass/main.scss");

require("./js/teamLightbox");

require("../node_modules/basiclightbox/dist/basicLightbox.min.css");
},{"./sass/main.scss":"sass/main.scss","./js/teamLightbox":"js/teamLightbox.js","../node_modules/basiclightbox/dist/basicLightbox.min.css":"../node_modules/basiclightbox/dist/basicLightbox.min.css"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59685" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","library.js"], null)
//# sourceMappingURL=/library.cbab63f8.js.map