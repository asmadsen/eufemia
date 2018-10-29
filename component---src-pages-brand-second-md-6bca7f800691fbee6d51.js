(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{163:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._frontmatter=t.default=void 0,n(84),n(53),n(298);var r,o=(r=n(0))&&r.__esModule?r:{default:r},a=n(278);function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}t.default=function(e){var t=e.components;u(e,["components"]);return o.default.createElement(a.MDXTag,{name:"wrapper",components:t},o.default.createElement(a.MDXTag,{name:"h1",components:t},"Brand"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Colors, fonts and logo guidelines are set in the DNB Brandbook. Please make sure to familiarise yourself with them."),o.default.createElement(a.MDXTag,{name:"h2",components:t},"Logos"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Guidelines for using DNB logo for digital media."),o.default.createElement(a.MDXTag,{name:"h2",components:t},"Brandbook"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Download the PDF"),o.default.createElement(a.MDXTag,{name:"h2",components:t},"Colors"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Sketch library file"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Figma library file"))};t._frontmatter={header:"Brand",title:"second",draft:!0}},278:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(330);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return a(r).default}});var o=n(301);function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return a(o).default}})},298:function(e,t,n){var r=n(30),o=n(43);n(332)("keys",function(){return function(e){return o(r(e))}})},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=c(n(0)),a=c(n(57)),u=c(n(1));function c(e){return e&&e.__esModule?e:{default:e}}var l=(0,a.default)({}),i=l.Provider,f=l.Consumer;t.withMDXComponents=function(e){return function(t){var n=t.components,a=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["components"]);return o.default.createElement(f,null,function(t){return o.default.createElement(e,r({components:n||t},a))})}};var p=function(e){var t=e.components,n=e.children;return o.default.createElement(i,{value:t},n)};p.propTypes={components:u.default.object.isRequired,children:u.default.element.isRequired},t.default=p},330:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),u=i(a),c=i(n(331)),l=n(301);function i(e){return e&&e.__esModule?e:{default:e}}var f={inlineCode:"code",wrapper:"div"},p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.parentName,o=e.props,a=void 0===o?{}:o,l=e.children,i=e.components,p=void 0===i?{}:i,s=e.Layout,d=e.layoutProps,m=p[n+"."+t]||p[t]||f[t]||t;return s?((0,c.default)(this,s),u.default.createElement(s,r({components:p},d),u.default.createElement(m,a,l))):u.default.createElement(m,a,l)}}]),t}();t.default=(0,l.withMDXComponents)(p)},331:function(e,t,n){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a=Object.defineProperty,u=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,l=Object.getOwnPropertyDescriptor,i=Object.getPrototypeOf,f=i&&i(Object);e.exports=function e(t,n,p){if("string"!=typeof n){if(f){var s=i(n);s&&s!==f&&e(t,s,p)}var d=u(n);c&&(d=d.concat(c(n)));for(var m=0;m<d.length;++m){var y=d[m];if(!(r[y]||o[y]||p&&p[y])){var b=l(n,y);try{a(t,y,b)}catch(e){}}}return t}return t}},332:function(e,t,n){var r=n(7),o=n(21),a=n(19);e.exports=function(e,t){var n=(o.Object||{})[e]||Object[e],u={};u[e]=t(n),r(r.S+r.F*a(function(){n(1)}),"Object",u)}}}]);
//# sourceMappingURL=component---src-pages-brand-second-md-6bca7f800691fbee6d51.js.map