define("@cloud/link-to/index",[],(function(e,t,r){r.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/build/",r(r.s=4)}([function(e,t,r){"use strict";r.r(t),r.d(t,"__extends",(function(){return o})),r.d(t,"__assign",(function(){return i})),r.d(t,"__rest",(function(){return u})),r.d(t,"__decorate",(function(){return a})),r.d(t,"__param",(function(){return c})),r.d(t,"__metadata",(function(){return s})),r.d(t,"__awaiter",(function(){return l})),r.d(t,"__generator",(function(){return p})),r.d(t,"__exportStar",(function(){return d})),r.d(t,"__values",(function(){return f})),r.d(t,"__read",(function(){return h})),r.d(t,"__spread",(function(){return g})),r.d(t,"__spreadArrays",(function(){return m})),r.d(t,"__await",(function(){return v})),r.d(t,"__asyncGenerator",(function(){return b})),r.d(t,"__asyncDelegator",(function(){return y})),r.d(t,"__asyncValues",(function(){return _})),r.d(t,"__makeTemplateObject",(function(){return w})),r.d(t,"__importStar",(function(){return O})),r.d(t,"__importDefault",(function(){return P}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};function o(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var i=function(){return(i=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function u(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r}function a(e,t,r,n){var o,i=arguments.length,u=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)u=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(u=(i<3?o(u):i>3?o(t,r,u):o(t,r))||u);return i>3&&u&&Object.defineProperty(t,r,u),u}function c(e,t){return function(r,n){t(r,n,e)}}function s(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}function l(e,t,r,n){return new(r||(r=Promise))((function(o,i){function u(e){try{c(n.next(e))}catch(e){i(e)}}function a(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new r((function(t){t(e.value)})).then(u,a)}c((n=n.apply(e,t||[])).next())}))}function p(e,t){var r,n,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;u;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,n=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}function d(e,t){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}function f(e){var t="function"==typeof Symbol&&e[Symbol.iterator],r=0;return t?t.call(e):{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}}}function h(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,i=r.call(e),u=[];try{for(;(void 0===t||t-- >0)&&!(n=i.next()).done;)u.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return u}function g(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(h(arguments[t]));return e}function m(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;var n=Array(e),o=0;for(t=0;t<r;t++)for(var i=arguments[t],u=0,a=i.length;u<a;u++,o++)n[o]=i[u];return n}function v(e){return this instanceof v?(this.v=e,this):new v(e)}function b(e,t,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n,o=r.apply(e,t||[]),i=[];return n={},u("next"),u("throw"),u("return"),n[Symbol.asyncIterator]=function(){return this},n;function u(e){o[e]&&(n[e]=function(t){return new Promise((function(r,n){i.push([e,t,r,n])>1||a(e,t)}))})}function a(e,t){try{(r=o[e](t)).value instanceof v?Promise.resolve(r.value.v).then(c,s):l(i[0][2],r)}catch(e){l(i[0][3],e)}var r}function c(e){a("next",e)}function s(e){a("throw",e)}function l(e,t){e(t),i.shift(),i.length&&a(i[0][0],i[0][1])}}function y(e){var t,r;return t={},n("next"),n("throw",(function(e){throw e})),n("return"),t[Symbol.iterator]=function(){return this},t;function n(n,o){t[n]=e[n]?function(t){return(r=!r)?{value:v(e[n](t)),done:"return"===n}:o?o(t):t}:o}}function _(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var t,r=e[Symbol.asyncIterator];return r?r.call(e):(e=f(e),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(r){t[r]=e[r]&&function(t){return new Promise((function(n,o){(function(e,t,r,n){Promise.resolve(n).then((function(t){e({value:t,done:r})}),t)})(n,o,(t=e[r](t)).done,t.value)}))}}}function w(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}function O(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}function P(e){return e&&e.__esModule?e:{default:e}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"mobile-dev",pages:[{id:"login",host:"auth.huaweicloud.com",path:"/authui/mobileLogin.html?locale={locale}&service={service}",rule:{isMatch:function(e){return e.indexOf("/authui/login")>-1},filter:function(e){return e.replace("/authui/login","/authui/mobileLogin.html")}},params:{locale:"string",service:"string"}},{id:"register",host:"reg.huaweicloud.com",path:"/registerui/cn/m/register.html?locale={locale}#/register",rule:{isMatch:function(e){return e.indexOf("/registerui/cn/register.html")>-1},filter:function(e){return e.replace("/registerui/cn/register.html","/registerui/cn/m/register.html")}},params:{locale:"string"}},{id:"grainCloud",host:"account.huaweicloud.com",target:"_blank",rule:{isMatch:function(e){return e.indexOf("/usercenter/#/buyservice/grainCloud")>-1},filter:function(e){return e.replace("/usercenter/#/buyservice/grainCloud","/usercenter/mobile/#/mobile/buyservice/grainCloud")}},path:"/usercenter/mobile/#/mobile/buyservice/grainCloud?promotionId={promotionId}&promotionPlanId={promotionPlanId}&solutionCode={solutionCode}&pkgPeriodType={pkgPeriodType}&pkgPeriodNum={pkgPeriodNum}&activityURL={activityURL}&domainName={domainName}",params:{promotionId:"string",promotionPlanId:"string",solutionCode:"string",pkgPeriodType:"string",pkgPeriodNum:"string",activityURL:"string",domainName:"string"}},{id:"servicePay",host:"account.huaweicloud.com",target:"_blank",path:"/usercenter/mobile/#/mobile/orderpay?orderId={orderId} ",rule:{isMatch:function(e){return e.indexOf("/usercenter/#/servicePay")>-1},filter:function(e){return e.replace("/usercenter/#/servicePay","/usercenter/mobile/#/mobile/orderpay")}},params:{orderId:"string",subject:"string",serviceURL:"string"}},{id:"checkVerify",host:"portal.huaweicloud.com",path:"/api/bss/userverified?callback=checkVerifyCallback",params:{}},{id:"realNameAuthingIndvBC",host:"account.huaweicloud.com",path:"/usercenter/mobile/?hws_route_url=mobile/bankcertification",params:{}},{id:"realNameAuthingIndv",host:"account.huaweicloud.com",path:"/usercenter/mobile/?hws_route_url=mobile/certificationtype",params:{}},{id:"realNameAuthingEnt",host:"account.huaweicloud.com",path:"/usercenter/mobile/?hws_route_url=mobile/companycertification",params:{}},{id:"realNameAuthing",host:"account.huaweicloud.com",path:"/usercenter/mobile/?hws_route_url=mobile/activityPersonalAuth",params:{}},{id:"getCoupons",host:"account.huaweicloud.com",path:"/usercenter/mobile/#/mobile/getcoupons?activityID={activityID}&contentID={contentID}&returnUrl={returnUrl}&returnTips={returnTips}",params:{activityID:"string",contentID:"string",returnUrl:"string",returnTips:"string"},rule:{isMatch:function(e){return e.indexOf("/usercenter/#/getCoupons")>-1},filter:function(e){return e.replace("/usercenter/#/getCoupons","/usercenter/mobile/#/mobile/getcoupons")}}},{id:"checkLogin",host:"portal.huaweicloud.com",path:"/index/islogin?callback=loginCallback",params:{}},{id:"webmobile",host:"console.huaweicloud.com",path:"/webmobile/m#{target}",params:{target:"string"}}]};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"web-dev",pages:[{id:"login",host:"auth.huaweicloud.com",path:"/authui/login?locale={locale}&service={service}",rule:{isMatch:function(e){return e.indexOf("/authui/mobileLogin.html")>-1},filter:function(e){return e.replace("/authui/mobileLogin.html","/authui/login")}},params:{locale:"string",service:"string"}},{id:"register",host:"reg.huaweicloud.com",path:"/registerui/cn/register.html?locale={locale}#/register",rule:{isMatch:function(e){return e.indexOf("/registerui/cn/m/register.html")>-1},filter:function(e){return e.replace("/registerui/cn/m/register.html","/registerui/cn/register.html")}},params:{locale:"string"}},{id:"grainCloud",host:"account.huaweicloud.com",target:"_blank",rule:{isMatch:function(e){return e.indexOf("/usercenter/mobile/#/mobile/buyservice/grainCloud")>-1},filter:function(e){return e.replace("/usercenter/mobile/#/mobile/buyservice/grainCloud","/usercenter/#/buyservice/grainCloud")}},path:"/usercenter/#/buyservice/grainCloud?promotionId={promotionId}&promotionPlanId={promotionPlanId}&solutionCode={solutionCode}&pkgPeriodType={pkgPeriodType}&pkgPeriodNum={pkgPeriodNum}&activityURL={activityURL}&domainName={domainName}",params:{promotionId:"string",promotionPlanId:"string",solutionCode:"string",pkgPeriodType:"string",pkgPeriodNum:"string",domainName:"string"}},{id:"servicePay",host:"account.huaweicloud.com",path:"/usercenter/#/servicePay?orderId={orderId}&subject={subject}&serviceURL={serviceURL}",target:"_blank",rule:{isMatch:function(e){return e.indexOf("/usercenter/mobile/#/mobile/orderpay")>-1},filter:function(e){return e.replace("/usercenter/mobile/#/mobile/orderpay","/usercenter/#/servicePay")}},params:{orderId:"string",subject:"string",serviceURL:"string"}},{id:"realNameAuthingIndvBC",host:"account.huaweicloud.com",path:"/usercenter/?hws_route_url=accountindex/realNameAuthing?type=indv-b-c",params:{}},{id:"realNameAuthingIndv",host:"account.huaweicloud.com",path:"/usercenter/?hws_route_url=accountindex/realNameAuthing?type=indv",params:{}},{id:"realNameAuthingEnt",host:"account.huaweicloud.com",path:"/usercenter/?hws_route_url=accountindex/realNameAuthing",params:{}},{id:"realNameAuthing",host:"account.huaweicloud.com",path:"/usercenter/?hws_route_url=accountindex/realNameAuthing",params:{}},{id:"getCoupons",host:"account.huaweicloud.com",path:"/usercenter/#/getCoupons?activityID={activityID}&contentID={contentID}&returnUrl={returnUrl}&returnTips={returnTips}",params:{activityID:"string",contentID:"string",returnUrl:"string",returnTips:"string"},rule:{isMatch:function(e){return e.indexOf("/usercenter/mobile/#/mobile/getcoupons")>-1},filter:function(e){return e.replace("/usercenter/mobile/#/mobile/getcoupons","/usercenter/#/getCoupons")}}},{id:"checkLogin",host:"portal.huaweicloud.com",path:"/index/islogin?callback=loginCallback",params:{}},{id:"checkVerify",host:"portal.huaweicloud.com",path:"/api/bss/userverified?callback=checkVerifyCallback",params:{}},{id:"webmobile",host:"console.huaweicloud.com",path:"/webmobile/#{target}",params:{target:"string"}}]};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"mobile-dev",pages:[{id:"realNameAuthing",host:"cloudapp",path:"/userVerified",params:{action:"string"},action:function(){return new Promise((function(e,t){window.galaxy.user.userVerified({success:function(t){return e(t)},error:function(e){return t(e)}})}))}},{id:"login",host:"cloudapp",path:"/login",params:{}}]};t.routes=n},function(e,t,r){e.exports=r(5)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=r(0),i=r(6),u=r(22),a=r(23),c=r(25);!function(e){e[e._blank=0]="_blank",e[e._self=1]="_self"}(n||(n={}));var s=function(){function e(e){this.isIntl=e.isIntl||!1,this.env=e.env||"prod",this.mode=e.mode||"prod",this.protocol=e.protocol,this.autoParseEnv(),this.init()}return e.getInstance=function(t){return this.instance||(this.instance=new e(t)),this.instance},e.prototype.getUrl=function(e,t,r){void 0===r&&(r={});var n,o=this.currentRoutes[e];if(/^((https?)|(\/\/))/.test(e))n=e;else{if(!o)return"";var i=r.host?r.host:o.host;n=(this.protocol?this.protocol+":":window.location.protocol)+"//"+(i||window.location.hostname)+o.path}return a.formatUrl(n,t)},e.prototype.go=function(e,t,r){var i=this.currentRoutes[e],c=this.getUrl(e,t,r);return"app"===a.getEndpoint()&&window.galaxy?t&&t.isSchema?window.galaxy.router.openSchema({schema:c,isOpenExist:t.isOpenExist,data:o.__assign({},t)}):window.galaxy.router.open({requestURL:c,pageTitle:t.pageTitle,isOpenExist:t.isOpenExist,param:o.__assign({},t)}):this.mode!==u.MODE_SILENT&&(r&&r.target===n._self?window.location.href=c:(r&&r.target===n._blank||i.target===u.TARGET_BLANK)&&"mobile"!==a.getEndpoint()?window.open(c):window.location.href=c),c},e.prototype.scan=function(){var e=this,t=document.querySelectorAll("."+u.SCAN_CLASS+':not([data-link-to-status="'+u.SCAN_STATUS_SCANNED+'"])');Array.prototype.slice.call(t).forEach((function(t){var r=t.href;Object.keys(e.currentRoutes).map((function(n){var o=e.currentRoutes[n];return o.rule&&o.rule.isMatch(r)&&(t.href=o.rule.filter(r),t.dataset[u.SCAN_STATUS_KEY]=u.SCAN_STATUS_SCANNED),!0}))}))},e.prototype.config=function(e){this.env=e.env||this.env,this.mode=e.mode||this.mode,this.protocol=e.protocol,this.init()},e.prototype.autoParseEnv=function(){var e=window.location.host;e.indexOf("-intl")>-1&&(this.isIntl=!0),e.indexOf(c.TEST)>-1&&(this.env="test")},e.prototype.init=function(){var e=this;this.endpoint=i[a.getEndpoint()],this.currentRoutes={},(this.endpoint?this.endpoint[this.env]:[]).pages.forEach((function(t){t.host=c.getHostByEnv(t.host,e.env,e.isIntl),e.currentRoutes[t.id]=t,"function"==typeof t.action?e[t.id]=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return t.action.apply(t,e)}:e[t.id]=function(r,n){return e.go(t.id,r,n)}}))},e}();t.default=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(7);t.mobile=n.default;var o=r(12);t.web=o.default;var i=r(17);t.app=i.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(8),o=r(9),i=r(10),u=r(11),a={id:"mobile",dev:n.routes,pre:o.routes,test:i.routes,prod:u.routes};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"mobile-dev",pages:r(1).routes.pages};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(1),i={id:"mobile-pre",pages:Object.keys(o.routes.pages).map((function(e){var t=n.__assign({},o.routes.pages[e]);return"login"===t.id&&(t.host="auth.ulanqab.huawei.com"),t}))};t.routes=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(1),i={id:"mobile-test",pages:Object.keys(o.routes.pages).map((function(e){var t=n.__assign({},o.routes.pages[e]);return"checkLogin"===t.id&&(t.host="portal.ulanqab.huawei.com"),t}))};t.routes=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"mobile-prod",pages:r(1).routes.pages};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(13),o=r(14),i=r(15),u=r(16),a={id:"web",dev:n.routes,pre:o.routes,test:i.routes,prod:u.routes};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"web-dev",pages:r(2).routes.pages};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(2),i={id:"web-pre",pages:Object.keys(o.routes.pages).map((function(e){var t=n.__assign({},o.routes.pages[e]);return"login"===t.id&&(t.host="auth.ulanqab.huawei.com"),t}))};t.routes=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(2),i={id:"web-test",pages:Object.keys(o.routes.pages).map((function(e){var t=n.__assign({},o.routes.pages[e]);return"checkLogin"===t.id&&(t.host="portal.ulanqab.huawei.com"),t}))};t.routes=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"web-prod",pages:r(2).routes.pages};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(18),o=r(19),i=r(20),u=r(21),a={id:"app",dev:n.routes,pre:o.routes,test:i.routes,prod:u.routes};t.default=a},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"app-dev",pages:r(3).routes.pages};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(3),i={id:"app-pre",pages:Object.keys(o.routes.pages).map((function(e){var t=n.__assign({},o.routes.pages[e]);return"login"===t.id&&(t.host="auth.ulanqab.huawei.com"),t}))};t.routes=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"app-test",pages:r(3).routes.pages};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={id:"app-prod",pages:r(3).routes.pages};t.routes=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SCAN_CLASS="link-to";t.TARGET_BLANK="_blank";t.SCAN_STATUS_SCANNED="scanned";t.SCAN_STATUS_KEY="linkToStatus";t.MODE_SILENT="silent"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(24);t.formatUrl=function(e,t){void 0===t&&(t={});for(var r="",o="",i=n(e,t),u=/\{(.+?)\}/g,a=u.exec(e);a;)delete t[a[1]],a=u.exec(e);Object.keys(t).map((function(e){return r=r?r+"&"+e+"="+t[e]:e+"="+t[e]}));var c=i.split("#");if(c.length>1){var s=c.shift(),l=c.join("#"),p=s.indexOf("?")>-1?"&":"?";o=""+s+(r&&p)+r+"#"+l}else{p=i.indexOf("?")>-1?"&":"?";o=""+i+(r&&p)+r}return o};t.getEndpoint=function(){var e="web";return/galaxy/i.test(navigator.userAgent)?e="app":/(iphone|ipad|ipod|ios|android|galaxy)/i.test(navigator.userAgent.toLocaleLowerCase())&&(e="mobile"),e}},function(e,t){var r=/\{([0-9a-zA-Z_]+)\}/g;e.exports=function(e){var t;if(2===arguments.length&&"object"==typeof arguments[1])t=arguments[1];else{t=new Array(arguments.length-1);for(var n=1;n<arguments.length;++n)t[n-1]=arguments[n]}t&&t.hasOwnProperty||(t={});return e.replace(r,(function(r,n,o){var i;return"{"===e[o-1]&&"}"===e[o+r.length]?n:null==(i=t.hasOwnProperty(n)?t[n]:null)?"":i}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.INTL="-intl",t.NORMAL="",t.TEST=".ulanqab.huawei.com",t.PRD=".huaweicloud.com",function(e){e.TEST="test",e.PRD="prd"}(t.ENV||(t.ENV={})),t.getHostName=function(e){return e.replace(new RegExp("("+t.INTL+")?("+t.TEST+"|"+t.PRD+")"),"")},t.getHostByEnv=function(e,r,n){void 0===n&&(n=!1);var o=n;new RegExp("\\w"+t.INTL+".").test(e)&&(o=!0);var i=t.getHostName(e),u={test:function(){return""+i+(o?t.INTL:t.NORMAL)+t.TEST},prod:function(){return""+i+(o?t.INTL:t.NORMAL)+t.PRD}}[r];return u?u():e}}])}));