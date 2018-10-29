(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{165:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t._frontmatter=t.default=void 0,n(84),n(53),n(298);var r,o=(r=n(0))&&r.__esModule?r:{default:r},a=n(278);function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}t.default=function(e){var t=e.components;c(e,["components"]);return o.default.createElement(a.MDXTag,{name:"wrapper",components:t},o.default.createElement(a.MDXTag,{name:"h1",components:t},"Icons"),o.default.createElement(a.MDXTag,{name:"p",components:t},"At DNB we are currently using Streamline icons as our source for off-the-shelf vector icons."),o.default.createElement(a.MDXTag,{name:"p",components:t},"Link: ",o.default.createElement(a.MDXTag,{name:"a",components:t,parentName:"p",props:{href:"https://www.streamlineicons.com/"}},"https://www.streamlineicons.com/")),o.default.createElement(a.MDXTag,{name:"h2",components:t},"Using Icons"),o.default.createElement(a.MDXTag,{name:"h4",components:t},"Sizing"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Eufemia icons come in ",o.default.createElement("b",null),"two"," sizes:"),o.default.createElement(a.MDXTag,{name:"ul",components:t},o.default.createElement(a.MDXTag,{name:"li",components:t,parentName:"ul"},"16px"),o.default.createElement(a.MDXTag,{name:"li",components:t,parentName:"ul"},"24px")),o.default.createElement(a.MDXTag,{name:"p",components:t},"NB! @Jens & @Sindre - we probably don't need to mention the stroke weight issue....just leave it as is"),o.default.createElement(a.MDXTag,{name:"h4",components:t},"Spacing"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Icons should have a minimum area of 8px between them and their nearest neighbour."),o.default.createElement(a.MDXTag,{name:"h4",components:t},"Custom Icons"),o.default.createElement(a.MDXTag,{name:"p",components:t},"Streamline caters for pretty much all of Eufemia's icon needs. However, sometimes there is a need for a custom icon. in these cases please contact one of Eufemia's design leads."))};t._frontmatter={header:"Icons",title:"Icons Library",draft:!1,order:1}},278:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(330);Object.defineProperty(t,"MDXTag",{enumerable:!0,get:function(){return a(r).default}});var o=n(301);function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"MDXProvider",{enumerable:!0,get:function(){return a(o).default}})},298:function(e,t,n){var r=n(30),o=n(43);n(332)("keys",function(){return function(e){return o(r(e))}})},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.withMDXComponents=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=u(n(0)),a=u(n(57)),c=u(n(1));function u(e){return e&&e.__esModule?e:{default:e}}var i=(0,a.default)({}),l=i.Provider,s=i.Consumer;t.withMDXComponents=function(e){return function(t){var n=t.components,a=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}(t,["components"]);return o.default.createElement(s,null,function(t){return o.default.createElement(e,r({components:n||t},a))})}};var f=function(e){var t=e.components,n=e.children;return o.default.createElement(l,{value:t},n)};f.propTypes={components:c.default.object.isRequired,children:c.default.element.isRequired},t.default=f},330:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),c=l(a),u=l(n(331)),i=n(301);function l(e){return e&&e.__esModule?e:{default:e}}var s={inlineCode:"code",wrapper:"div"},f=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.Component),o(t,[{key:"render",value:function(){var e=this.props,t=e.name,n=e.parentName,o=e.props,a=void 0===o?{}:o,i=e.children,l=e.components,f=void 0===l?{}:l,p=e.Layout,m=e.layoutProps,d=f[n+"."+t]||f[t]||s[t]||t;return p?((0,u.default)(this,p),c.default.createElement(p,r({components:f},m),c.default.createElement(d,a,i))):c.default.createElement(d,a,i)}}]),t}();t.default=(0,i.withMDXComponents)(f)},331:function(e,t,n){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},a=Object.defineProperty,c=Object.getOwnPropertyNames,u=Object.getOwnPropertySymbols,i=Object.getOwnPropertyDescriptor,l=Object.getPrototypeOf,s=l&&l(Object);e.exports=function e(t,n,f){if("string"!=typeof n){if(s){var p=l(n);p&&p!==s&&e(t,p,f)}var m=c(n);u&&(m=m.concat(u(n)));for(var d=0;d<m.length;++d){var y=m[d];if(!(r[y]||o[y]||f&&f[y])){var b=i(n,y);try{a(t,y,b)}catch(e){}}}return t}return t}},332:function(e,t,n){var r=n(7),o=n(21),a=n(19);e.exports=function(e,t){var n=(o.Object||{})[e]||Object[e],c={};c[e]=t(n),r(r.S+r.F*a(function(){n(1)}),"Object",c)}}}]);
//# sourceMappingURL=component---src-pages-icons-md-c049d02dc9d06587399d.js.map