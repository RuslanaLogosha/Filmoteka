parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"clu1":[function(require,module,exports) {

},{"./../images/header-bg-main-mobile.jpg":[["header-bg-main-mobile.5f0e0563.jpg","EmiW"],"EmiW"],"./../images/header-bg-main-mobile@2x.jpg":[["header-bg-main-mobile@2x.69ebf59a.jpg","w01Z"],"w01Z"],"./../images/header-bg-main-tablet.jpg":[["header-bg-main-tablet.fdae738c.jpg","EVwW"],"EVwW"],"./../images/header-bg-main-desktop.jpg":[["header-bg-main-desktop.b1dc7576.jpg","UrUB"],"UrUB"],"./../images/header-bg-lib-mobile.jpg":[["header-bg-lib-mobile.75be5dec.jpg","HjNz"],"HjNz"],"./../images/header-bg-lib-mobile@2x.jpg":[["header-bg-lib-mobile@2x.574b70b9.jpg","DgrK"],"DgrK"],"./../images/header-bg-lib-tablet.jpg":[["header-bg-lib-tablet.782ec71d.jpg","upBq"],"upBq"],"./../images/header-bg-lib-desktop.jpg":[["header-bg-lib-desktop.ff0d1068.jpg","wcxy"],"wcxy"],"./../images/header-bg-modal-mobile.jpg":[["header-bg-modal-mobile.3c593593.jpg","MlzW"],"MlzW"],"./../images/header-bg-modal-mobile@2x.jpg":[["header-bg-modal-mobile@2x.7f7ae302.jpg","maHz"],"maHz"],"./../images/header-bg-modal-tablet.jpg":[["header-bg-modal-tablet.782ec71d.jpg","e3Z6"],"e3Z6"],"./../images/header-bg-modal-desktop.jpg":[["header-bg-modal-desktop.b3510d46.jpg","yBHb"],"yBHb"],"./../images/pagination/arrow-left.svg":[["arrow-left.4a7fa05f.svg","hGlq"],"hGlq"],"./../images/pagination/arrow-right.svg":[["arrow-right.7cd9d78c.svg","AXFk"],"AXFk"]}],"BNjD":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,n=arguments[3];!function(t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof e&&e.amd?e([],t):("undefined"!=typeof window?window:void 0!==n?n:"undefined"!=typeof self?self:this).basicLightbox=t()}(function(){return function e(n,t,o){function r(c,u){if(!t[c]){if(!n[c]){var a="function"==typeof require&&require;if(!u&&a)return a(c,!0);if(i)return i(c,!0);var s=new Error("Cannot find module '"+c+"'");throw s.code="MODULE_NOT_FOUND",s}var l=t[c]={exports:{}};n[c][0].call(l.exports,function(e){return r(n[c][1][e]||e)},l,l.exports,e,n,t,o)}return t[c].exports}for(var i="function"==typeof require&&require,c=0;c<o.length;c++)r(o[c]);return r}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=t.visible=void 0;var o=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],t=document.createElement("div");return t.innerHTML=e.trim(),!0===n?t.children:t.firstChild},r=function(e,n){var t=e.children;return 1===t.length&&t[0].tagName===n},i=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};t.visible=i,t.create=function(e,n){var t=function(e,n){var t=o('\n\t\t<div class="basicLightbox '.concat(n.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),i=t.querySelector(".basicLightbox__placeholder");e.forEach(function(e){return i.appendChild(e)});var c=r(i,"IMG"),u=r(i,"VIDEO"),a=r(i,"IFRAME");return!0===c&&t.classList.add("basicLightbox--img"),!0===u&&t.classList.add("basicLightbox--video"),!0===a&&t.classList.add("basicLightbox--iframe"),t}(e=function(e){var n="string"==typeof e,t=e instanceof HTMLElement==1;if(!1===n&&!1===t)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(o(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(n)),c=function(e){return!1!==n.onClose(u)&&function(e,n){return e.classList.remove("basicLightbox--visible"),setTimeout(function(){return!1===i(e)||e.parentElement.removeChild(e),n()},410),!0}(t,function(){if("function"==typeof e)return e(u)})};!0===n.closable&&t.addEventListener("click",function(e){e.target===t&&c()});var u={element:function(){return t},visible:function(){return i(t)},show:function(e){return!1!==n.onShow(u)&&function(e,n){return document.body.appendChild(e),setTimeout(function(){requestAnimationFrame(function(){return e.classList.add("basicLightbox--visible"),n()})},10),!0}(t,function(){if("function"==typeof e)return e(u)})},close:c};return u}},{}]},{},[1])(1)});
},{}],"BUzh":[function(require,module,exports) {
module.exports="/Filmoteka/team-ruslana.cfd606a2.jpeg";
},{}],"lCO7":[function(require,module,exports) {
module.exports="/Filmoteka/team-olga.290fc5d0.jpeg";
},{}],"rsRe":[function(require,module,exports) {
module.exports="/Filmoteka/team-daria.56dbd8ae.jpeg";
},{}],"teSq":[function(require,module,exports) {
module.exports="/Filmoteka/team-denis.83d25fa9.jpeg";
},{}],"SSP9":[function(require,module,exports) {
module.exports="/Filmoteka/team-ihor.69672155.jpeg";
},{}],"xvTJ":[function(require,module,exports) {
module.exports="/Filmoteka/team-katya.9245ebba.jpeg";
},{}],"oipq":[function(require,module,exports) {
module.exports="/Filmoteka/team-vladymyr.ca9972e2.jpeg";
},{}],"dMI5":[function(require,module,exports) {
module.exports="/Filmoteka/team-aleksandr.c06e6ead.jpg";
},{}],"QAGW":[function(require,module,exports) {
module.exports="/Filmoteka/sprite.36085026.svg";
},{}],"otvH":[function(require,module,exports) {
"use strict";var a=u(require("basiclightbox")),e=o(require("../images/team-ruslana.jpeg")),t=o(require("../images/team-olga.jpeg")),s=o(require("../images/team-daria.jpeg")),n=o(require("../images/team-denis.jpeg")),r=o(require("../images/team-ihor.jpeg")),c=o(require("../images/team-katya.jpeg")),i=o(require("../images/team-vladymyr.jpeg")),l=o(require("../images/team-aleksandr.jpg")),g=o(require("../images/sprite.svg"));function o(a){return a&&a.__esModule?a:{default:a}}function m(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return m=function(){return a},a}function u(a){if(a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var e=m();if(e&&e.has(a))return e.get(a);var t={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in a)if(Object.prototype.hasOwnProperty.call(a,n)){var r=s?Object.getOwnPropertyDescriptor(a,n):null;r&&(r.get||r.set)?Object.defineProperty(t,n,r):t[n]=a[n]}return t.default=a,e&&e.set(a,t),t}var h='<div class="team-wrapper"><div class="team-card">\n    <img src="'.concat(e.default,'" alt="Ruslana" class="team-image">\n    <p class="team-name">Ruslana</p>\n    <p class="team-role">Team Lead</p>\n    <a href="https://github.com/RuslanaLogosha" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div>\n<div class="team-card">\n    <img src="').concat(t.default,'" alt="Olga" class="team-image">\n    <p class="team-name">Olga</p>\n    <p class="team-role">Scrum Master</p>\n    <a href="https://github.com/levshukova" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div>\n<div class="team-card">\n    <img src="').concat(s.default,'" alt="Daria" class="team-image">\n    <p class="team-name">Daria</p>\n    <p class="team-role">Developer</p>\n    <a href="https://github.com/Daria-Churkina" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div>\n<div class="team-card">\n    <img src="').concat(n.default,'" alt="Denis" class="team-image">\n    <p class="team-name">Denis</p>\n    <p class="team-role">Developer</p>\n    <a href="https://github.com/" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div>\n<div class="team-card">\n    <img src="').concat(r.default,'" alt="Ihor" class="team-image">\n    <p class="team-name">Ihor</p>\n    <p class="team-role">Developer</p>\n    <a href="https://github.com/taraiihor" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div>\n<div class="team-card">\n    <img src="').concat(c.default,'" alt="Katya" class="team-image">\n    <p class="team-name">Katya</p>\n    <p class="team-role">Developer</p>\n    <a href="https://github.com/Kateryna-Urbanovych" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div>\n<div class="team-card">\n    <img src="').concat(i.default,'" alt="Vladymyr" class="team-image">\n    <p class="team-name">Vladymyr</p>\n    <p class="team-role">Developer</p>\n    <a href="https://github.com/created-with-love" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div>\n<div class="team-card">\n    <img src="').concat(l.default,'" alt="Aleksandr" class="team-image">\n    <p class="team-name">Aleksandr</p>\n    <p class="team-role">Developer</p>\n    <a href="https://github.com/AleksMkm" target="_blank" class="team-git"><svg class="logo__icon" width="24" height="24">\n      <use href="').concat(g.default,'#github"></use>\n    </svg></a>\n</div></div>'),d=document.querySelector(".js-team-modal"),p='<img src="'.concat(c.default,'"/>');function f(e){return a.create(e)}function v(a){f(h).show()}d.addEventListener("click",v);
},{"basiclightbox":"BNjD","../images/team-ruslana.jpeg":"BUzh","../images/team-olga.jpeg":"lCO7","../images/team-daria.jpeg":"rsRe","../images/team-denis.jpeg":"teSq","../images/team-ihor.jpeg":"SSP9","../images/team-katya.jpeg":"xvTJ","../images/team-vladymyr.jpeg":"oipq","../images/team-aleksandr.jpg":"dMI5","../images/sprite.svg":"QAGW"}],"jRvc":[function(require,module,exports) {

},{}],"I9BA":[function(require,module,exports) {
"use strict";require("./sass/main.scss"),require("./js/teamLightbox"),require("../node_modules/basiclightbox/dist/basicLightbox.min.css");
},{"./sass/main.scss":"clu1","./js/teamLightbox":"otvH","../node_modules/basiclightbox/dist/basicLightbox.min.css":"jRvc"}]},{},["I9BA"], null)
//# sourceMappingURL=/Filmoteka/library.e636640b.js.map