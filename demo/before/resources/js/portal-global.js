var BO = {
    wekit: true,
    Chrome: false,
    Safari: false,
    Firefox: false,
    Opera: false,
    IE: false,
    oldIE: false,
    newIE: false,
    iDevice: false,
    iPhone: false,
    iPad: false,
    android: false,
    name: "unkonwn",
    version: ""
};
(function () {
    "use strict";
    var uaInfo = navigator.userAgent;
    BO.getUAInfo = function () {
        return uaInfo
    };
    BO.init = function () {
        BO.detectBrowser();
        BO.detectDevice()
    };
    BO.detectBrowser = function () {
        var regF = /Firefox[\/\s](\d+\.\d+)/, regO = /Opera|OPR[\/\s](\d+\.\d+)/, regI = /MSIE[\/\s](\d+\.\d+)/,
            regC = /Chrome[\/\s](\d+\.\d+)/, regS = /Safari[\/\s](\d+\.\d+)/, regIn = /rv[\:\s](\d+\.\d+).*like Gecko/;
        BO.Firefox = regF.test(uaInfo);
        BO.Opera = regO.test(uaInfo);
        BO.Chrome = regC.test(uaInfo);
        BO.Safari = !BO.Chrome && regS.test(uaInfo);
        BO.newIE = regIn.test(uaInfo);
        BO.IE = BO.newIE || regI.test(uaInfo);
        BO.oldIE = BO.IE && !BO.newIE && Number(uaInfo.match(regI)[1]) < 9;
        var regSV = /Version\/(\d+.\d+.\d+)/;
        BO.Chrome && (BO.name = "Chrome") && (BO.version = uaInfo.match(regC) && uaInfo.match(regC)[1]);
        BO.Firefox && (BO.name = "Firefox") && (BO.version = uaInfo.match(regF) && uaInfo.match(regF)[1]);
        BO.Safari && (BO.name = "Safari") && (BO.version = uaInfo.match(regSV) && uaInfo.match(regSV)[1]);
        BO.Opera && (BO.name = "Opera") && (BO.version = uaInfo.match(regO) && uaInfo.match(regO)[1]);
        BO.IE && (BO.name = "IE") && (BO.version = BO.newIE ? uaInfo.match(regIn) && uaInfo.match(regIn)[1] : (uaInfo.match(regI) && uaInfo.match(regI))[1]);
        BO.webkit = !(BO.Firefox || BO.Opera || BO.IE)
    };
    BO.detectDevice = function () {
        var ua = uaInfo.toLowerCase();
        BO.android = ua.indexOf("android") > -1;
        /iPad/i.test(uaInfo) && (BO.iPad = true) && (BO.iDevice = true);
        /iPhone|iPod/i.test(uaInfo) && (BO.iPhone = true) && (BO.iDevice = true)
    }
})();
$.fn.scrollUnique = function () {
    return $(this).each(function () {
        var eventType = "mousewheel";
        if (document.mozHidden !== undefined) {
            eventType = "DOMMouseScroll"
        }
        $(this).on(eventType, function (event) {
            var scrollTop = this.scrollTop, scrollHeight = this.scrollHeight, height = this.clientHeight;
            if ("wheelDeltaX" in event.originalEvent && event.originalEvent.wheelDeltaX !== 0) return;
            if ("deltaX" in event.originalEvent && event.originalEvent.deltaX !== 0) return;
            if ("axis" in event.originalEvent && event.originalEvent.axis === event.originalEvent.HORIZONTAL_AXIS) return;
            var delta = event.originalEvent.wheelDelta ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);
            delta = delta / 5;
            if (delta > 0 && scrollTop <= delta || delta < 0 && scrollHeight - height - scrollTop <= -1 * delta) {
                this.scrollTop = delta > 0 ? 0 : scrollHeight;
                event.preventDefault()
            }
        })
    })
};
(function () {
    var lastTime = 0;
    var vendors = ["webkit", "moz"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = (new Date).getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall)
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id)
        }
    }
})();
jQuery.extend(jQuery.easing, {
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b
    }
});
$(function () {
    BO.init();
    BO.oldIE && $("body").addClass("oldIE");
    BO.iDevice && $("body").addClass("Mobile");
    if (BO.oldIE && !localStorage.getItem("hideCompatible")) {
        $("body").addClass("Compatible")
    }
    var win_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        win_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var $frame = $("body");
    $(window).scroll(function (event) {
        if (!$("#header").hasClass("loaded")) {
            return
        }
        var currTop = $(window).scrollTop();
        if (currTop <= 30) {
            $frame.removeClass("scrolled")
        } else {
            $frame.addClass("scrolled")
        }
        if (currTop > win_height) {
            $(".float-sidebar").addClass("show-totop")
        } else {
            $(".float-sidebar").removeClass("show-totop")
        }
        $(".float-sidebar").removeClass("show")
    });
    if (win_width < 1024) {
        $(".float-sidebar").on("click", ".shown-btn", function (event) {
            $(this).closest(".float-sidebar").addClass("show")
        });
        $(".icons-float-bar").click(function (e) {
            window.open("https://www.huaweicloud.com/intl/zh-cn/contact-sales.html")
        });
        $(document).bind("click", function (e) {
            if ($(e.target).closest(".float-bar-nav").length == 0 && $(e.target).closest(".sub-nav-layer").length == 0 && $(e.target).closest("#open").length == 0) {
                $(".sub-nav-layer").removeClass("float-expand")
            }
        });
        $(".help-header").addClass("hide")
    }
    var $header = $("#header");

    function setSubNav() {
        $(".subnav-layer").each(function (index, el) {
            $(this).css("top", $(this).height() * -1)
        })
    }

    headerFun();

    function headerFun() {
        $header.addClass("loaded");
        $(".compatibility .close-large").on("click", function (event) {
            $("body").removeClass("Compatible");
            localStorage.setItem("hideCompatible", true)
        });
        $(window).scroll()
    }

    $(".code-2-box").hover(function () {
        $(this).addClass("show").siblings(".code-2-box").removeClass("show")
    }, function () {
    });
    $frame.on("click", 'a[href="#toTop"]', function (event) {
        event.stopPropagation();
        $("body,html").stop().animate({scrollTop: 0}, 500, "easeOutSine", function () {
            href_click = false
        })
    });
    $frame.on("click", 'a[href^="#"]', function (event) {
        event.preventDefault();
        var headerHeight = $("#header").height();
        var target = $(this).attr("href").substr(1);
        var top = 0;
        if ($("#" + target).length > 0) {
            top = $("#" + target).offset().top - headerHeight
        } else if ($("[name='" + target + "']").length > 0) {
            top = $("[name='" + target + "']").offset().top - headerHeight
        }
        $("body,html").stop().animate({scrollTop: top}, 500, "easeOutSine", function () {
            href_click = false
        })
    });
    $(".js-title").hover(function () {
        if (this.offsetWidth < this.scrollWidth) {
            $(this).attr("title", $.trim($(this).text()))
        }
    });
    var lang = $("html").attr("lang") ? $("html").attr("lang").toLowerCase() : null;
    var service = encodeURIComponent(window.location.href);
    var registerUrl = "https://reg.huaweicloud.com/registerui/intl/register.html?" + (lang ? "locale=" + lang : "") + "&service=" + service;
    $("#header .header-register>a").attr("href", registerUrl);
    $frame.on("click", ".aui-button[disabled]", function (e) {
        e.preventDefault()
    });
    !function () {
        window.changeLang = window.changeLang || function (lang) {
            function setCookie(name, value, expiredays) {
                var exdate, cookieString;
                exdate = new Date;
                exdate.setDate(exdate.getDate() + expiredays);
                cookieString = name + "=" + escape(value) + (expiredays === null ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;" + "domain=.huaweicloud.com;";
                document.cookie = cookieString
            }

            var href = window.location.href;
            var origin = window.location.origin;
            var pathname = window.location.pathname;
            var hash = window.location.hash;
            var current_lang = $("html").attr("lang").toLowerCase();
            var start_lang = current_lang;
            var end_lang = lang;
            var index = origin.replace("activity-intl", "intl") + "/" + end_lang + "/";
            var url = "";
            if (pathname.indexOf(start_lang) === 1) {
                url = href.replace(start_lang, end_lang).replace(/locale=[A-Za-z0-9_-]{5}/gi, "locale=" + end_lang)
            } else {
                var pathnameLang = pathname.split("/")[1];
                if (pathnameLang == "zh-cn" || pathnameLang == "zh-cn" || pathnameLang == "es-us" || pathnameLang == "pt-br") {
                    url = origin + "/" + end_lang + pathname.replace("/" + pathnameLang, "") + hash
                } else {
                    url = origin + "/" + end_lang + pathname + hash
                }
            }
            setCookie("locale", lang, 30);
            if (url) {
                $.ajax({
                    url: url, type: "get", success: function () {
                        window.location.href = url
                    }, error: function () {
                        window.location.href = index
                    }
                })
            } else {
                window.location.href = index
            }
        }
    }();
    !function () {
        var $register = $(".register-area");
        if ($register.length === 0) return;
        var $registerBg = $(".register-area-bg");
        var registerHeight = $register.outerHeight();
        var maxBgMoveLength = $registerBg.outerHeight() - registerHeight;
        var maxDiff = $("body").height() - $register.offset().top;
        var moveRatio = maxBgMoveLength / maxDiff;
        var setBgPosition = function () {
            var offset = $register.offset();
            var topToWindow = offset.top - $(window).scrollTop();
            var windowHeight = $(window).height();
            var diff = windowHeight - topToWindow;
            var bgMoveLength = moveRatio * diff;
            bgMoveLength = bgMoveLength < 0 ? 0 : bgMoveLength;
            bgMoveLength = bgMoveLength > maxBgMoveLength ? maxBgMoveLength : bgMoveLength;
            $registerBg.css("margin-bottom", -bgMoveLength + "px")
        };
        setBgPosition();
        $(window).scroll(function () {
            setBgPosition()
        })
    }();

    function initFloatDialog() {
        try {
            function getCookie(name) {
                var arr = document.cookie.replace(/\s/g, "").split(";");
                for (var i = 0; i < arr.length; i++) {
                    var tempArr = arr[i].split("=");
                    if (tempArr[0] === name) {
                        return decodeURIComponent(tempArr[1])
                    }
                }
                return undefined
            }

            function setCookie(name, value, expiredays) {
                var exdate, cookieString;
                exdate = new Date;
                exdate.setDate(exdate.getDate() + expiredays);
                cookieString = name + "=" + escape(value) + (expiredays === null ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;" + "domain=.huaweicloud.com;";
                document.cookie = cookieString
            }

            var currentData = (new Date).getMonth() + "0" + (new Date).getDay();
            var dialogUrl = "./resources/contents/html/floatpage-HUAWEI CLOUD.html?" + currentData;
            var currentUrl = location.href;
            if (location.href.indexOf("/content") > -1) {
                dialogUrl = location.origin + "/content/cloudbu-site/intl/en-us/common/float-dialog-page-hk.html?" + currentData
            }
            var tocList1 = {
                "/content/cloudbu-site/hk/en-us/activity/": "activity.huaweicloud.com/intl/en-us/",
                "/content/cloudbu-site/hk/en-us/support/": "support.huaweicloud.com/intl/en-us/",
                "/content/cloudbu-site/hk/en-us/": "www.huaweicloud.com/intl/en-us/",
                "/content/cloudbu-site/hk/zh-cn/activity/": "activity.huaweicloud.com/intl/zh-cn/",
                "/content/cloudbu-site/hk/zh-cn/support/": "support.huaweicloud.com/intl/zh-cn/",
                "/content/cloudbu-site/hk/zh-cn/": "www.huaweicloud.com/intl/zh-cn/"
            };
            if (currentUrl.indexOf("/content") > -1) {
                for (var key in tocList1) {
                    currentUrl = currentUrl.replace(window.location.hostname + (window.location.port ? ":" + window.location.port : ""), "").replace(key, tocList1[key])
                }
            }
            var container = document.createElement("div");
            var showBottomAd = true;
            // console.log(dialogUrl);
            // $.ajax({
            //     url: dialogUrl, async: false, timeout: 1e4, success: function (data) {
            //         container.innerHTML = data;
            //         var insertItem = "";
            //         var insertBottomAD = "";
            //         var insertTopAD = "";
            //         var urlLength = 0;
            //         $(container).find(".float-sidebar").each(function (index, item) {
            //             var $this = $(item);
            //             var rangUrls = $this.attr("range") ? $this.attr("range").split(";") : [];
            //             var unRangeUrls = $this.attr("unrange") ? $this.attr("unrange").split(";") : [];
            //             var isShow = true;
            //             unRangeUrls.forEach(function (item2) {
            //                 if (currentUrl.indexOf(item2) > -1) {
            //                     isShow = false
            //                 }
            //             });
            //             if (isShow) {
            //                 rangUrls.forEach(function (item1) {
            //                     if (currentUrl.indexOf(item1) > -1 || $this.attr("range") == "default") {
            //                         insertItem = item1.length > urlLength ? item : insertItem;
            //                         urlLength = item1.length > urlLength ? item1.length : urlLength
            //                     }
            //                     try {
            //                         if ($this.attr("range") == "homeindex" && window.location.host == "www.huaweicloud.com" && (window.location.pathname == "/" || window.location.pathname == "/index.html")) {
            //                             insertItem = item;
            //                             return
            //                         }
            //                     } catch (error) {
            //                     }
            //                 })
            //             }
            //         });
            //         urlLength = 0;
            //         $(container).find(".tm-adv-space").each(function (index, item) {
            //             var $this = $(item);
            //             if (getCookie($this.attr("ahref")) && getCookie($this.attr("ahref")) >= ($this.attr("times") || 3)) {
            //                 showBottomAd = false;
            //                 return false
            //             }
            //         });
            //         if (showBottomAd) {
            //             $(container).find(".tm-adv-space").each(function (index, item) {
            //                 var $this = $(item);
            //                 if (getCookie($this.attr("ahref")) < $this.attr("times") || 3) {
            //                     var rangUrls = $this.attr("range") ? $this.attr("range").split(";") : [];
            //                     var unRangeUrls = $this.attr("unrange") ? $this.attr("unrange").split(";") : [];
            //                     var isShow = true;
            //                     unRangeUrls.forEach(function (item2) {
            //                         if (currentUrl.indexOf(item2) > -1) {
            //                             isShow = false
            //                         }
            //                     });
            //                     if (isShow) {
            //                         rangUrls.forEach(function (item1) {
            //                             if (currentUrl.indexOf(item1) > -1) {
            //                                 var adContent = '<div class="tm-adv-space-content" bi_name="bottom-ad-mb" style="background:url(' + $this.attr("abg") + ');background-size:100% 100%;"><div class="tm-adv-space-content-close"><i class="tm-adv-space-content-close__icon"></i></div><a target="_blank" href="' + $this.attr("ahref") + '" class="tm-adv-space-content__main"><div class="tm-adv-space-content__title">' + ($this.attr("atitle") || "") + '</div><div class="tm-adv-space-content__desc">' + ($this.attr("adesc") || "") + "</div></a>" + ($this.attr("abtn") ? '<div class="tm-adv-space-btn"><a target="_blank" href="' + $this.attr("ahref") + '" class="tm-adv-space-btn__inner">' + $this.attr("abtn") + "</a></div>" : "") + "</div>";
            //                                 $this.append(adContent);
            //                                 insertBottomAD = item1.length > urlLength ? $this : insertBottomAD;
            //                                 urlLength = item1.length > urlLength ? item1.length : urlLength
            //                             }
            //                             try {
            //                                 if ($this.attr("range") == "homeindex" && window.location.host == "www.huaweicloud.com" && (window.location.pathname == "/" || window.location.pathname == "/index.html")) {
            //                                     insertBottomAD = $this;
            //                                     return
            //                                 }
            //                             } catch (error) {
            //                             }
            //                         })
            //                     }
            //                 }
            //             })
            //         }
            //         if (!$("body").hasClass("showPrompt") && !getCookie("header-top-ad-hk")) {
            //             urlLength = 0;
            //             $(container).find(".prompt-content.header-top-ad").each(function (index, item) {
            //                 var $this = $(item);
            //                 var rangUrls = $this.attr("range") ? $this.attr("range").split(";") : [];
            //                 var unRangeUrls = $this.attr("unrange") ? $this.attr("unrange").split(";") : [];
            //                 var isShow = true;
            //                 unRangeUrls.forEach(function (item2) {
            //                     if (currentUrl.indexOf(item2) > -1) {
            //                         isShow = false
            //                     }
            //                 });
            //                 if (isShow) {
            //                     rangUrls.forEach(function (item1) {
            //                         if (currentUrl.indexOf(item1) > -1) {
            //                             var adContent = '<a href="' + $this.attr("adurl") + '" target="blank" bi_name="top-ad" class="top-ad"><img class="img1" src="' + $this.attr("adbg") + '"><img class="img2" src="' + $this.attr("adbg2") + '"><img class="img3" src="' + $this.attr("adbg3") + '"><i bi_name="top-ad-close"></i><style>.header-top-ad img {width: auto;height: 100%;margin: 0 auto;position: absolute;left: 50%;transform: translate(-50%,0);max-width: inherit;}</style></a>';
            //                             $this.html(adContent);
            //                             insertTopAD = item1.length > urlLength ? $this : insertTopAD;
            //                             urlLength = item1.length > urlLength ? item1.length : urlLength
            //                         }
            //                         try {
            //                             if ($this.attr("range") == "homeindex" && window.location.host == "www.huaweicloud.com" && (window.location.pathname == "/" || window.location.pathname == "/index.html")) {
            //                                 insertTopAD = $this;
            //                                 return
            //                             }
            //                         } catch (error) {
            //                         }
            //                     })
            //                 }
            //             });
            //             $(".header-container").prepend(insertTopAD);
            //             if (insertTopAD.length > 0) {
            //                 $("body").addClass("showPrompt");
            //                 $("#header").addClass("showPrompt");
            //                 $("#header").addClass("top-ad-height")
            //             }
            //         }
            //         $("#footer").append(insertBottomAD);
            //         $("#footer").append(insertItem);
            //         if (typeof afterFooterSidebar === "function") {
            //             afterFooterSidebar()
            //         }
            //     }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            //         console.log(XMLHttpRequest.status, XMLHttpRequest.readyState, textStatus)
            //     }
            // });
            $(".prompt-content .top-ad i").on("click", function (e) {
                $(".header-top-ad").remove();
                $("body").removeClass("showPrompt");
                $("#header").removeClass("showPrompt");
                $("#header").removeClass("top-ad-height");
                if (!getCookie("header-top-ad-hk")) {
                    setCookie("header-top-ad-hk", "hide", 1)
                }
                e.preventDefault();
                e.stopPropagation();
                return
            });
            $(".icons-float-bar").click(function (e) {
                $(".sub-nav-layer").toggleClass("float-expand");
                if (window.screen.width < 1024) {
                    e.preventDefault()
                }
            });
            $(".nps-score-btns p").on("click", function () {
                var $this = $(this);
                $this.siblings().removeClass("active");
                $this.addClass("active")
            });
            $(".float-config-nps .por-textarea").blur(function () {
                $(".float-config-nps").removeClass("active")
            });
            $(".float-config-nps .por-textarea").focus(function () {
                $(".float-config-nps").addClass("active")
            });
            $(".float-config-nps .por-textarea").on("input", function () {
                $(".float-config-nps .por-textarea-word").text($(this).val().length)
            });
            $(".tm-adv-space-content-close").on("click", function () {
                var $this = $(this);
                var adKey = $this.parents(".tm-adv-space").attr("ahref");
                $(this).parents(".tm-adv-space").remove();
                var times = getCookie(adKey) ? getCookie(adKey) : 0;
                setCookie(adKey, ++times, 1)
            });
            $(".tm-adv-space-content a").on("click", function (e) {
                var $this = $(this);
                if ($this.attr("href").indexOf("/login") > -1 && window.portalLogin) {
                    portalLogin(encodeURIComponent(window.location.href), "zh-cn");
                    e.preventDefault()
                } else if ($this.attr("href").indexOf("/register") > -1 && window.portalRegister) {
                    portalRegister(encodeURIComponent(window.location.href), "zh-cn");
                    e.preventDefault()
                } else if ($this.attr("href").indexOf("/realNameAuth") > -1 && window.portalrealNameAuthing) {
                    portalrealNameAuthing(encodeURIComponent(window.location.href), "zh-cn");
                    e.preventDefault()
                }
            });

            function calcTime(ds) {
                if (!ds) {
                    return 0
                }
                var t1 = ds;
                var d1 = t1.replace(/\-/g, "/");
                var dateBegin = new Date(d1);
                var dateEnd = new Date;
                var dateDiff = dateEnd.getTime() - dateBegin.getTime();
                var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1e3));
                return dayDiff
            }

            if (window.isLogin && currentUrl.indexOf("/content") < 0) {
                var requestUrl = "https://console.ulanqab.huawei.com/nps-api/";
                if (window.location.href.indexOf("huaweicloud.com") > -1) {
                    requestUrl = "https://voc.huaweicloud.com/survey-api/"
                }
                $.ajax({
                    method: "GET",
                    url: requestUrl + "api/get/commit/date",
                    contentType: "application/json",
                    data: {
                        surveyId: "hwcloudbusurvey_key_fbd25bdbdb88",
                        serviceId: "portal",
                        userId: window.jsonParamInit ? window.jsonParamInit.UserAccount : ""
                    },
                    success: function (data) {
                        if ((calcTime(data.data) > 30 || data.data == "") && window.isLogin && window.screen.width >= 1024) {
                            $(".float-config-btn.nps").css("display", "block")
                        }
                    },
                    error: function (err) {
                        $(".float-config-btn.nps").css("display", "none")
                    }
                })
            }

            function npsSuccess() {
                $(".float-config-nps").addClass("hide");
                $(".float-config-nps-result.success").addClass("active");
                setTimeout(function () {
                    $(".float-config-nps").removeClass("hide");
                    $(".float-config-nps-result.success").removeClass("active");
                    $(".float-config-btn.nps").css("display", "none")
                }, 2e3)
            }

            function npsFail() {
                $(".float-config-nps").addClass("hide");
                $(".float-config-nps-result.fail").addClass("active");
                setTimeout(function () {
                    $(".float-config-nps").removeClass("hide");
                    $(".float-config-nps-result.fail").removeClass("active")
                }, 2e3)
            }

            $(".nps-btn-wrapper .por-btn").on("click", function () {
                var score = $(".nps-score-btns .active").length > 0 ? $(".nps-score-btns .active").attr("id").replace("score", "") : 0;
                var reason = $("#textarea1 .por-textarea").val();
                var ge_get = window.pageMatedataPrefix + "nps反馈_" + score + "_" + reason;
                var domain_pre = (window.location.host || "").split(".")[0] || "";
                if (window.sendBiReport) {
                    window.sendBiReport(ge_get, domain_pre, window.jsonParamEvent, 1)
                }
                if (!score) {
                    return
                }
                var npsData = JSON.stringify({
                    data: {
                        surveyId: "hwcloudbusurvey_key_fbd25bdbdb88",
                        answers: [{
                            reason: reason,
                            questionId: "question_0",
                            answer: score,
                            subName: "您向朋友或同事推荐华为云的可能性有多大",
                            subRemark: score
                        }],
                        serviceId: "portal",
                        w3account: window.jsonParamInit ? window.jsonParamInit.UserAccount : ""
                    }
                });
                $.ajax({
                    method: "POST",
                    url: "https://voc.huaweicloud.com/survey-api/api/save",
                    contentType: "application/json",
                    data: npsData,
                    success: function (data) {
                        if (data.data == "0") {
                            npsSuccess()
                        } else {
                            npsFail()
                        }
                    },
                    error: function (err) {
                        npsFail()
                    }
                })
            });
            $(document).bind("click", function (e) {
                if ($(e.target).closest(".float-bar-nav").length == 0 && $(e.target).closest(".sub-nav-layer").length == 0 && $(e.target).closest("#open").length == 0) {
                    $(".sub-nav-layer").removeClass("float-expand")
                }
            })
        } catch (error) {
        }
    }

    $(window).load(function () {
        initFloatDialog()
    })
});