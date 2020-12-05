window.$PromptUtil = window.$PromptUtil || {
    setCookie : function (name, value, expiredays) {
        var exdate, cookieString;
        exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        cookieString = name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;" + "domain=.huaweicloud.com;";
        document.cookie = cookieString;
    },

    setPromptCookie : function (name, value, expiredays) {
        var exdate, cookieString, cookieJson, tmpResult, result;
        cookieString = window.$PromptUtil.getCookie("prompt");
        cookieJson = cookieString ? JSON.parse(cookieString) : {};
        cookieJson[name] = value;
        exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        tmpResult = JSON.stringify(cookieJson);
        result = "prompt=" + escape(tmpResult) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;" + "domain=.huaweicloud.com;";
        document.cookie = result;
    },

    getPromptCookie : function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + "prompt" + "=([^;]*)(;|$)"));
        if(arr == null) {
            return;
        }
        var cookieString = unescape(arr[2]);
        var cookieJson = JSON.parse(cookieString);
        var result = cookieJson[name];
        return result;
    },

	getCookie : function (name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) {
            return unescape(arr[2]);
        }
		return null;
    },

	delCookie : function (name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if (cval != null) {
		  document.cookie = name+"=;expires=" + exp.toGMTString()+ ";path=/;" + "domain=.huaweicloud.com;";
		}
	}
};



(function($) {
    var str = "<div id='prompt-content' class='prompt-content'><div class='prompt-wrapper'><div class='prompt-wrapper-content'>" +
        "<p ><i class='prompt-important' ></i><span class='prompt-info prefix'></span><a href='' class='prompt-link'></a><span class='prompt-info subfix'></span></p>" +
        "<div class='prompt-radio'><i></i><span></span></div>" +
        "<i class='prompt-closed'></i>" +
        "</div></div></div>";
    var _head = $('#header');
    var _wrapper = _head.find('.wrapper');
    var _container = _head.find('.header-container');
    var _focus = "unfocus";

    function isActivityPage() {
        var url = window.location.href;
        return (url.indexOf("https://activity.") == 0 || url.indexOf("http://activity.") == 0);
    }

    function prompts(type, country, lan, ref, promptTips, isLogin, activityPageEvent) {
        var _head = $('#header');
        var _wrapper = _head.find('.wrapper');
        var _container = _head.find('.header-container');
        var _focus = "unfocus";
        var isActivity = isActivityPage();
        var loginStatus = "notLogin";
        if (isLogin) {
            loginStatus = "login";
        }
        _head.addClass('showPrompt');
        $("body").addClass('showPrompt');
        //$("body").append('<style id="prompt-fix-scroll" type="text/css">.scrolled .sidebar-box.fixed{top:104px !important;}@media (min-width: 1024px) {.product-header-btn-wrapper.show{margin-top:104px !important;}}</style>');
        if (window.$PromptUtil.getPromptCookie("focus") == "focus" && !activityPageEvent) {
            _head.removeClass('showPrompt');
            $("body").removeClass('showPrompt');
            //$("#prompt-fix-scroll").remove();
            return;
        };
        //if (!type) return;
        if (type == "ip") {
            _head.addClass('showPrompt_ip');
        } else {
            _head.removeClass('showPrompt_ip');
        }
        if (!isLogin && $("#prompt-content").length != 0 && $("#prompt-content").hasClass("logined")) {
            return;
        }
        if ($("#prompt-content").length == 0) {
            if (_wrapper.length != 0) {
                _wrapper.prepend(str);
            } else if (_container.length != 0) {
                _container.prepend(str);
            } else {
                _head.prepend(str);
            }
        }
        // flag incase of logic confict when login or not login
        if (isLogin) {
            $("#prompt-content").addClass("logined");
        }
        var _info = $('.prompt-info.prefix'),
            _a = $('.prompt-link'),
            _radio = $('.prompt-radio'),
            _subfixInfo = $(".prompt-info.subfix");
        isActivity = false; //activity页面和其他页面提示相同
        if (isActivity && isLogin) {
            _info.html(promptTips[loginStatus][country][lan].activityInfo);
            _a.remove();
            if (activityPageEvent) {
                _radio.remove();
            }
        } else {
            if(!promptTips[loginStatus][country][lan]) {
                $('.prompt-content').remove();
                $('#header').removeClass('showPrompt');
                $("body").removeClass('showPrompt');
                return;
            }
            _info.html(promptTips[loginStatus][country][lan].info);
            if (!ref) {
                ref = lan;
            }
            _a.html(promptTips[loginStatus][country][lan].referrer[ref]);
            _a.attr('href', promptTips[loginStatus][country][lan].referrer[ref]);
            _subfixInfo.html(promptTips[loginStatus][country][lan].subfixInfo);
            if ($("#prompt-content .prompt-link").hasClass("prompt-link")&&$("#prompt-content .prompt-link").html().indexOf('intl')==-1) {
                $("#prompt-content .prompt-link").attr(
                "href",
                $("#prompt-content .prompt-link")
                    .attr("href")
                    .replace("en-us", "zh-cn")
                );
                $("#prompt-content .prompt-link").html(
                $("#prompt-content .prompt-link")
                    .html()
                    .replace("en-us", "zh-cn")
                );
            }
        }
        _radio.find('span').html(promptTips[loginStatus][country][lan].radioText);
    }

    function menuPrompts(dis, country, lan, ref, promptTips, isLogin) {
        if (!isLogin || !dis) {
            return;
        }
        if (!ref) {
            ref = lan;
        }
        var loginStatus = "login";
        var logoutUrl = "//portal.huaweicloud.com/index/logout";
        if (country == "HK") {
            logoutUrl = "//portal-intl.huaweicloud.com/index/logout";
        }
        var str = "<ul class='header-user-info-list-prompt'>" +
            "<li class='prompt'><p>" +
            promptTips[loginStatus][country][lan].menuInfo +
            "<a class='prompt-link' href='" + promptTips[loginStatus][country][lan].referrer[ref] + "'>" + promptTips[loginStatus][country][lan].menuSiteName + "</a>" +
            promptTips[loginStatus][country][lan].subfixMenuInfo +
            "</p></li>" +
            "<li class='header-user-info-split'></li>" +
            "<li class='logout'><a href='" + logoutUrl + "'>" +
            promptTips[loginStatus][country][lan].loginOutText +
            "</a></li></ul>";
        $(str).insertBefore($(".account-nav"));
    }

    function activityPrompts(dis, country, lan, ref, promptTips) {
        if ($("#prompt-modal-tips").length > 0) {
            $("#prompt-modal").show();
            $("#prompt-modal-tips").show();
        } else {
            if (promptTips && promptTips["login"] && promptTips["login"][country] && promptTips["login"][country][lan]) {
                var lanInfo = promptTips["login"][country][lan];
                var info = [lanInfo.activityInfo, '<a href="', lanInfo.referrer[ref], '">', lanInfo.referrer[ref], '</a>', lanInfo.subfixActivityInfo].join("");
                var str = [
                    '<div class="prompt-modal-shade" id="prompt-modal">',
                    '	<div class="prompt-modal" id="prompt-modal-tips">',
                    '		<div class="prompt-mod-close" data-state="close"></div>',
                    '		<div class="prompt-mod-body">',
                    '			<div class="prompt-mod-state-icons "></div>',
                    '			<div class="prompt-mod-content prompt-mod-content-layout">',
                    '				<div class="prompt-mod-content-center">',
                    '					<h3 class="prompt-mod-content-title">',
                    lanInfo.activityInfoTitle,
                    '</h3>',
                    '				</div>',
                    '			</div>',
                    '		</div>',
                    '		<div class="prompt-mod-tips"> ',
                    info,
                    '		</div>',
                    '		<div class="prompt-mod-footer">',
                    '			<button class="prompt-btn">',
                    lanInfo.activityBtn,
                    '			</button>',
                    '		</div>',
                    '	</div>',
                    '</div>'
                ].join("");

                $("body").append(str);
                $("#prompt-modal").show();
                $("#prompt-modal-tips").show();
            }
        }

    }


    //根据站点和语言获取首页url
    function getHomeUrl(site, lang) {
        var currentDomain = window.location.hostname;
        if(currentDomain == "support-intl.huaweicloud.com" || currentDomain == "support.huaweicloud.com" ){
            currentDomain = "support.huaweicloud.com";
        }else{
            currentDomain = "www.huaweicloud.com";
        }
        var homePageUrl = "https://"+currentDomain+"/";
        if (site == "hk") {
            homePageUrl += "intl/";
        }
        if (lang == "zh-cn") {
            if(site == "hk"){
                homePageUrl += "zh-cn/";
            }
        }else{
            homePageUrl += (lang+"/");
        }
        return homePageUrl;
    }

    function changeLang(lang) {
        var site = $("html").attr("site");
        var index = getHomeUrl(site, lang);

        //解决低版本ie兼容性
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }

        var href = window.location.href;
        var origin = window.location.origin;
        var host = window.location.protocol + "//" + window.location.hostname;

        var pathname = window.location.pathname;
        var hash = window.location.hash;


        var current_lang = $('html').attr('lang').toLowerCase();
        var start_lang = current_lang;
        var end_lang = lang;
        var url = "";
        var tempPathname = pathname;

        //把文件名中含有语言标识的去掉,对帮助中心特别忽略掉IR2019110700205 
        if(tempPathname.replace(/(en-us|zh-cn|es-us|pt-br)\w*.html/ig,'').indexOf(start_lang) > 0 && origin.indexOf('support') < 0) {
            //解决locale与路径不统一问题
            url = href.replace(start_lang, end_lang).replace(/locale=[A-Za-z0-9_-]{5}/ig,'locale='+end_lang);
        } else {
            //解决多语言插件问题,避免语言拼接重复
            //var pathnameLang = pathname.split('/')[1];
            var pathnameLang = pathname.match(/zh-cn\/|en-us\/|es-us\/|pt-br\//)?pathname.match(/zh-cn|en-us|es-us|pt-br/)[0]:'';
            if(pathnameLang == 'zh-cn' || pathnameLang == 'en-us'|| pathnameLang == 'es-us' || pathnameLang == 'pt-br'){
                pathname = pathname.replace(/en-us_topic|zh-cn_topic|es-us_topic|pt-br_topic/,end_lang+'_topic');
                url = origin + pathname.replace('/'+pathnameLang,'/'+end_lang) + hash;
            }
            else{
                pathname = pathname.replace(/en-us_topic|zh-cn_topic|es-us_topic|pt-br_topic/,end_lang+'_topic');
                url = origin + "/" + end_lang + pathname + hash;
                url = pathname.indexOf('intl') > -1 ? (origin + pathname.replace('intl','intl/'+ end_lang ) + hash):(origin + "/" + end_lang + pathname + hash);
            }
        }

        if(site=='china'){
            url = url.replace('/zh-cn','');
        }
        window.$PromptUtil.setCookie('locale', lang, 30);
        if (url) {
            $.ajax({
                url: url,
                type: "get",
                success: function() {
                    window.location.href = url;
                },
                error: function(data) {
                    window.$PromptUtil.setPromptCookie('no-lang-page', true, 1);
                    window.location.href = index;
                }
            });
        } else {
            window.location.href = index;
        }
    }
    /**
     * 执行加载脚本
     */
    $(document).on("click", ".prompt-radio i", function() {
        $(this).closest('.prompt-radio').toggleClass('active');
    });
    $(document).on("click", ".prompt-closed", function() {
        $('#header').removeClass('showPrompt');
        $("body").removeClass('showPrompt');
        $("#prompt-fix-scroll").remove();
        if ($('.prompt-radio').hasClass('active')) _focus = "focus";
        window.$PromptUtil.setPromptCookie("focus", _focus);
        $(this).closest('.prompt-content').fadeOut(300, function() {
            $('.prompt-content').remove();
        });
    });
    $(document).on("click", "#prompt-modal .prompt-btn, #prompt-modal .prompt-mod-close", function() {
        $("#prompt-modal").hide();
        $("#prompt-modal-tips").hide();
    });
    window.prompts = prompts;
    window.menuPrompts = menuPrompts;
    window.changeLang = changeLang;
    window.activityPrompts = activityPrompts;

})(jQuery);



(function($) {
    var proUrl, iso;

    /**
     *
     * @param url
     */
    function promptSend(urll) {
        $.ajax({
            type: 'GET',
            url: urll,
            success: function(result) {
                if(result && result.data && result.data.length > 0) {
                    if(result.data[0].location) {
                        if( !result.data[0].location.countrycode ) {
                            return;
                        }
                        iso = (result.data[0].location.countrycode == 'CN') ? 'CN' : 'HK';
                        if (iso == window.reg) return;
                        prompts("ip", window.reg, window.promptLan, window.refLan, window.promptTips, false);
                    }
                }
            },
            error: function() {
                console.log("error")
            }
        });
    }

    function promptQueryIP() {
        if (window.reg == "CN") {
            proUrl = "https://portal.huaweicloud.com/portaluserqueryservice/ipsearch";
            promptSend(proUrl);
        } else {
            proUrl = "https://portal-intl.huaweicloud.com/portaluserqueryservice/ipsearch";
            promptSend(proUrl);
        }
    }

    window.promptQueryIP = promptQueryIP;

    if (!window.$PEP) {
        promptQueryIP();
    }

})(jQuery);


/*
* 同站点切换语言页面不存在时的提示
*/
(function($){

	var lang = $("html").attr('lang');
	var site = $("html").attr('site');
	var changeLangClass = 'changelang-popup';
	if (lang === 'en-US' && site === 'china') {
		changeLangClass = 'changelang-popup short-header';
	}

	var changeLangStr = '<div id="changelang-popup" class="' + changeLangClass + '">' +
		'<div class="important-area"><i class="prompt-important" ></i></div>'+
		'<p class="changelang-info"></p>'+
		//'<div class="prompt-radio"><i></i><span></span></div>'+
		'<i class="changeLan-closed"></i>'+
		'</div>';

	function showChangeLanTip(){

//        if(window.localStorage.langTipShow == "hide"){
//            return;
//        }
		if(window.$PromptUtil.getPromptCookie("no-lang-page") == true){
			window.$PromptUtil.setPromptCookie("no-lang-page", false);
			//$("#content").prepend(changeLangStr);
			if (lang === 'en-US' && site === 'china') {
				$(changeLangStr).insertAfter("#header .header-wrapper-bg");
			}else{
				$("#header .header-wrapper").prepend(changeLangStr);
			}
			var _langTip = $(".changelang-popup .changelang-info");
			if(window.promptLan){
				_langTip.html(promptTips["changeLanTip"][window.promptLan].info);
			}
			$(".changelang-popup").addClass("show");
			setTimeout(function(){
				$(".changelang-popup").removeClass("show");
			},5000);
		}
	}

    $("#header").on("click",".changelang-popup .changeLan-closed",function(){
//		var langNotShow = "";
//        if( $('.changelang-popup .prompt-radio').hasClass('active')){
//			langNotShow = "hide";
//		}
//        window.localStorage.setItem("langTipShow",langNotShow);
        $(this).closest('.changelang-popup').fadeOut(300,function(){
			$('.changelang-popup').remove();
        });
    })

    window.showChangeLanTip = showChangeLanTip;

	if(!window.$usiteUtil) {

        window.$usiteUtil = {
            isApp : function(){
                return /(galaxy)/i.test(navigator.userAgent.toLocaleLowerCase()); 
            },
            getCookie: function(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return '';
            },
            setCookie: function(name, value, expiredays){
                var exdate, cookieString;
                exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                cookieString = name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;" + "domain=.huaweicloud.com;";
                document.cookie = cookieString;  
            },
            isHomePageCnZh: function(){
                var protocal =  window.location.protocol;
                var path = window.location.origin + window.location.pathname;
                path = path.replace(protocal, "");
                var reg = /\/\/www.(huaweicloud|ulanqab.huawei).com\/(($)|index.html|index\/index_ab.html)/;
                if(path.match(reg)) {
                    return true;
                }
                return false;
            },
            isHomePageCnEn: function(){
                var protocal =  window.location.protocol;
                var path = window.location.origin + window.location.pathname;
                path = path.replace(protocal, "");
                var reg = /\/\/www.(huaweicloud|ulanqab.huawei).com\/en-us\/(($)|index.html)/;
                if(path.match(reg)) {
                    return true;
                }
                return false;
            }
    
        };

		$(document).on("click", ".prompt-wrapper-content .prompt-link, .header-lang-item a[href*='.huaweicloud.com'], #header .lang-list a[href*='.huaweicloud.com'], .header-collapse-lang a[href*='.huaweicloud.com'],.header-user-info-list-prompt a[href*='.huaweicloud.com']", function(e){
            var $target = $(e.target);
            var href = $target.attr("href");
            if(href.indexOf("intl.huaweicloud.com")!=-1 || href.indexOf(".huaweicloud.com/intl")!=-1) {
                window.$usiteUtil.setCookie("usite", "intl");
            } else if(href.indexOf("www.huaweicloud.com")!=-1) {
                window.$usiteUtil.setCookie("usite", "cn");
            }
        });
    }

    if(!window.$urlLanguage) {
        if(window.location.hostname.indexOf("intl") === 0) {
            var currentPathName = window.location.pathname;
            var currentSite =  $('html').attr("site");
            if(currentSite == "hk"){
                if(currentPathName == "/") {
                    window.$urlLanguage = "en-us";
                } else {
                    var tempArray = currentPathName.split("/");
                    (tempArray.length > 1) && (window.$urlLanguage = tempArray[1]);
                }
            } else {
                if(currentPathName == "/") {
                    window.$urlLanguage = "zh-cn";
                } else {
                    var tempArray = currentPathName.split("/");
                    (tempArray.length > 1) && (window.$urlLanguage = tempArray[1]);
                }
            }
        } else {
            var currentPathName = window.location.pathname;
            var currentSite =  $('html').attr("site");
            if(currentSite == "hk") {
                currentPathName = currentPathName.replace("/intl/", "/");
                if(currentPathName == "/") {
                    window.$urlLanguage = "en-us";
                } else {
                    var tempArray = currentPathName.split("/");
                    (tempArray.length > 1) && (window.$urlLanguage = tempArray[1]);
                }
            } else {
                if(currentPathName == "/") {
                    window.$urlLanguage = "zh-cn";
                } else {
                    var tempArray = currentPathName.split("/");
                    (tempArray.length > 1) && (window.$urlLanguage = tempArray[1]);
                }
            }
        }

        var tipsInfo = {
            "china" : {
                "zh-cn": "当前页面暂无所选语言版本，以下为英文版。为您带来不便，深感抱歉!",
                "en-us": "This page is not available in your selected language."
            },
            "hk" : {
                "zh-cn": "当前页面暂无所选语言版本，以下为英文版。为您带来不便，深感抱歉!",
                "es-us": "Esta página no está disponible en el idioma seleccionado.",
                "en-us": "This page is not available in your selected language.",
                "pt-br": "Esta página não está disponível no seu idioma selecionado."
            }
        };

        var toggleLanguageTips = function(flag, lang, site){
            if($("#changelang-popup:visible").length > 0) {
                return;
            }
            if(!flag) {
                $("#lang-tips").remove();
            } else {
                // 根据语言来展示提示
                var tipsText = tipsInfo[site] && tipsInfo[site][lang];
                if(tipsText) {
                    var htmlWrapper = '<div id="lang-tips" class="changelang-popup show"><div class="important-area"><i class="prompt-important"></i></div><p class="changelang-info">' + tipsText + '</p><i class="changeLan-closed"></i></div>'
                    $("#header .header-wrapper").append(htmlWrapper);
                    setTimeout(function(){
                        $("#lang-tips").remove();
                    }, 5000);
                }
            }
        };

        var currentUrl = window.location.href,
                currentLanguage = window.$urlLanguage,
                currentSite =  $('html').attr("site"),
                contentLanguage = $("html").attr("lang") || "",
                shouldShowTips = false;

        if(contentLanguage != ""){
            shouldShowTips = (currentLanguage != contentLanguage.toLowerCase());
            toggleLanguageTips(shouldShowTips, currentLanguage, currentSite);
        }

        // close按钮
        $(document).on("click", "#lang-tips .changeLan-closed", function(){
            $("#lang-tips").remove();
        });
    }
})(jQuery);

(function(){
    showChangeLanTip();
})()
