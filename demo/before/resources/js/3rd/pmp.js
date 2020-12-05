
/***初始化上报的api，该脚本依赖raven.min.js文件，需要下加载raven.min.js文件 */
if (typeof (window.PMP) == "undefined") {
    window.PMP = {};
    var PMPQueue = [];
    /**
     * 初始化监听js异常
     * sentryCode 为必传参数
     * customerId 为用户id,可以不传
     * needDownloadRaven , true表示需要下载raven.min.js ， fasle表示不需要
     * userErrorListener，true表示启用资源，ajax请求状态码（404 ,403...）异常监听
     *  */
    PMP.RavenInit = function (entryCode, customerId, needDownloadRaven, resourceListen, ajaxListen) {
        if (window.top !== window || window.location.href.indexOf("_is_test_=bonree") > -1 || window.location.href.indexOf("local.huaweicloud.com") > -1) {
            return;
        }
        if (needDownloadRaven) {
            PMP.JSLoader.load("https://res-static1.huaweicloud.com/content/dam/cloudbu-site/archive/commons/web_resoure/framework/portal/pmp/raven.min.js?v=2.0", function () {
                if (entryCode != "" && (typeof Raven != "undefined")) {
                    //初始化上报url
                    Raven && Raven.config(entryCode, { autoBreadcrumbs: { console: false } }).install();
                    //设置userid
                    PMP.RavenSetCustomerID(customerId);
                    //添加监听
                    if (typeof resourceListen == 'undefined') {
                        resourceListen = true;
                    }
                    if (typeof ajaxListen == 'undefined') {
                        ajaxListen = true;
                    }
                    PMP.RavenSetErrorCodeListener(resourceListen, ajaxListen);
                }
            })
        } else {
            if (entryCode != "" && (typeof Raven != "undefined")) {
                //初始化上报url
                Raven && Raven.config(entryCode, { autoBreadcrumbs: { console: false } }).install();
                //设置userid
                PMP.RavenSetCustomerID(customerId);
                //添加监听
                if (typeof resourceListen == 'undefined') {
                    resourceListen = true;
                }
                if (typeof ajaxListen == 'undefined') {
                    ajaxListen = true;
                }
                PMP.RavenSetErrorCodeListener(resourceListen, ajaxListen);
            }
        }
        //处理raven.min.js加载之前就设置的数据
        if (PMPQueue.length > 0) {
            var req = PMPQueue.pop();
            dealQueue(req);
        }
        PMPQueue = [];
    }
    PMP.ravenInit = PMP.RavenInit;

    function dealQueue(req) {
        if (typeof req === 'object') {
            if (req.name === 'setDSN') {
                PMP.RavenSetDSN(req.value);
            } else if (req.name === 'setCustomerID') {
                PMP.RavenSetCustomerID(req.value);
            } else if (req.name === 'setCustomerContext') {
                PMP.RavenSetCustomerContext(req.value);
            } else if (req.name === 'setTag') {
                PMP.RavenSetTag(req.value);
            }
        }
    }

    PMP.RavenSetDSN = function (sentryID) {
        if (typeof Raven != "undefined") {
            Raven.setDSN(sentryID);
        } else {
            PMPQueue.push({ name: "setDSN", value: sentryID })
        }
    }
    PMP.ravenSetDSN = PMP.RavenSetDSN;
    /**
     * 设置用户customerId
     */
    PMP.RavenSetCustomerID = function (customerId) {
        if (typeof Raven != "undefined") {
            Raven.setTagsContext({ CustomerId: customerId || "" });
        } else {
            PMPQueue.push({ name: "setCustomerID", value: customerId })
        }
    }
    PMP.ravenSetCustomerID = PMP.RavenSetCustomerID;
    /**
     * 设置用户customerContext
     */
    PMP.RavenSetCustomerContext = function (json) {
        if (typeof json == "object") {
            if (typeof Raven != "undefined") {
                Raven.setUserContext(json);
            } else {
                PMPQueue.push({ name: "setCustomerContext", value: a });
            }
        }
    }
    PMP.ravenSetCustomerContext = PMP.RavenSetCustomerContext;

    PMP.RavenSetTag = function (tag, value) {
        var a = {};
        if (tag) {
            a[tag] = value;
            if (typeof Raven != "undefined") {
                Raven.setTagsContext(a);
            } else {
                PMPQueue.push({ name: "setTag", value: a });
            }
        }
    }
    PMP.ravenSetTag = PMP.RavenSetTag;
    /**
     * 设置用户customerId
     * error --exception (string类型或者 Error对象)
     * message -- 异常相关信息
     * level --// one of 'info', 'warning', or 'error'
     * json:{apiPath:"/api/32/store/","dsnCode":"abcd"} --指定单条上报前端对应的project
     * tagJson 指定单条上报前求的tag{key, value}
     */
    var ExceptionQueue = [];
    PMP.RavenSendException = function (error, message, level, json, tagJson) {
        if (typeof error == 'string') {
            error = new Error(error);
        }
        var mes = message;
        if (typeof message == 'object' && message != null) {
            mes = JSON.stringify(mes);
        }
        var paramJson = {};
        if (typeof json == "object" && json != null) {
            paramJson = json;
            paramJson["message"] = mes;
            paramJson["level"] = level || 'error';
        } else {
            paramJson["message"] = mes;
            paramJson["level"] = level || 'error';
        }
        if (typeof tagJson == "object" && tagJson != null) {
            for (var key in tagJson) {
                PMP.RavenSetTag(key, tagJson[key]);
            }

        }
        var obj = { "error": error, "paramJson": paramJson }
        ExceptionQueue.push(obj);
        setTimeout(function () {
            if (ExceptionQueue.length == 0) {
                return;
            }
            var sendObj = ExceptionQueue.pop();
            (typeof Raven != "undefined") && Raven.captureException(sendObj["error"], sendObj["paramJson"]);
        }, 100 * ExceptionQueue.length);
    }
    PMP.ravenSendException = PMP.RavenSendException;
    /**
     * 官网设置的主动监听请求状态码异常事件上报
     */
    PMP.RavenSetErrorCodeListener = function (resourceListen, ajaxListen) {
        if (resourceListen) {
            window.addEventListener('error', function (error) {

                if (!error.message && !(!!window.ActiveXObject || "ActiveXObject" in window)) {
                    var resource = error.target || error.srcElement;
                    var link = resource && (resource.getAttribute("src") || resource.getAttribute("href"));
                    var errorCode = "404";
                    if (link && (link.indexOf("portal.huaweicloud.com") != -1 || link.indexOf("portal-intl.huaweicloud.com") != -1)) {
                        errorCode = "4xx/5xx";
                        link = link.split("?")[0];
                    }
                    if (window.location.host) {
                        var subDomain = window.location.host.split(".")[0];
                        if (subDomain == "www" || subDomain == "activity" || subDomain == "intl" || subDomain == "activity-intl") {
                            Raven && link && Raven.captureException(error, {
                                message: "resourceError " + errorCode + ": " + link,
                                fingerprint: ['{{ default }}', errorCode + ": " + link],
                                apiPath: "/api/65/store/",
                                dsnCode: "3ee1af7948994da9a3268b00525562ad"
                            });
                            return true;
                        }
                    }
                    if (link && link.indexOf('?') !== -1) {
                        link = link.split("?")[0];
                    }
                    Raven && link && Raven.captureException(error, {
                        message: "resourceError " + errorCode + ": " + link,
                        fingerprint: ['{{ default }}', errorCode + ": " + link]
                    });
                }
                return true;
            }, true);
        }
        if (ajaxListen) {
            if (window.XMLHttpRequest) {
                var xmlhttp = window.XMLHttpRequest;
                var _oldSend = xmlhttp.prototype.send;
                var _handleEvent = function (event) {
                    if (Raven && Raven.captureBreadcrumb() && Raven.captureBreadcrumb().v &&
                        Raven.captureBreadcrumb().v.path && (Raven.captureBreadcrumb().v.path.length > 1)) {
                        var liNode = Raven.captureBreadcrumb().v.path[1].outerHTML;
                        if (liNode && liNode.indexOf("header-lang-item") > -1) {
                            return;
                        }
                    }
                    if (event && event.currentTarget) {
                        var isCrossOrigin = (event.currentTarget.status == 0 && event.currentTarget.withCredentials && event.type != "abort");
                        if (event.currentTarget.status >= 400 || isCrossOrigin) {
                            // 活动页面跨站提示
                            if (event.currentTarget.status == 401 && window.$activityPromptTips && window.isLogin) {
                                var responseStr = event.currentTarget.response;
                                if (responseStr) {
                                    try {
                                        var resJson = JSON.parse(responseStr);
                                        if (resJson && resJson["data"] && resJson["data"]["code"] == "5001") {
                                            window.activityPrompts && window.activityPrompts(true, window.reg, window.promptLan, window.refLan, window.promptTips);
                                        }
                                    } catch (e) {
                                        console.log("JSON.parse error");
                                    }
                                }
                            }
                            var eventMessage = event.currentTarget.status + " " + (isCrossOrigin ? "crossorigin" : "") + ": " + (event.currentTarget.ea && event.currentTarget.ea.url);
                            Raven && Raven.captureException(event, {
                                message: "XMLHttpRequest status " + eventMessage,
                                fingerprint: ['{{ default }}', eventMessage]
                            });
                        }
                    }
                }
                xmlhttp.prototype.send = function () {
                    if (this['addEventListener']) {
                        this['addEventListener']('error', _handleEvent);
                        this['addEventListener']('load', _handleEvent);
                        this['addEventListener']('abort', _handleEvent);
                    } else {
                        var _oldStateChange = this['onreadystatechange'];
                        this['onreadystatechange'] = function (event) {
                            if (this.readyState === 4) {
                                _handleEvent(event);
                            }
                            _oldStateChange && _oldStateChange.apply(this, arguments);
                        };
                    }
                    return _oldSend.apply(this, arguments);
                }
            }
        }
    }
    PMP.ravenSetErrorCodeListener = PMP.RavenSetErrorCodeListener;

    /**
     * 下载js的依赖工具方法
     */
    //js文件加载函数
    PMP.JSLoader = function () {
        var callbacks = [], loaded = false;

        function executeCallBack() {
            var len = callbacks.length;
            for (var i = 0; i < len; i++) { var fun = callbacks.pop(); fun(); }
        }
        function getScript(url) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.async = "async";
            script.src = url;
            if (document.body) {
                document.body.appendChild(script);
            } else {
                document.head.appendChild(script);
            }
            if (script.readyState) {
                //  IE
                script.onreadystatechange = function () {
                    if (script.readyState == "complete" || script.readyState == "loaded") {
                        script.onreadystatechange = null;
                        loaded = true;
                        executeCallBack();
                    }
                }
            } else { script.onload = function () { loaded = true; executeCallBack(); } }
        }
        return {
            load: function (url) {
                var arg = arguments;
                var len = arg.length;
                getScript(url);
                for (var i = 1; i < len; i++) {
                    var fun = arg[i];
                    if (typeof fun == "function") { if (loaded) { fun(); } else { callbacks.push(fun); } }
                }
            }
        }
    }();
    /**
     * 当前各部件已有的sentryCode
     */
}
