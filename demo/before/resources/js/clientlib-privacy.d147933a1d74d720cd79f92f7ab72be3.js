window.$PrivacyUtil = window.$PrivacyUtil || {
    getCookie : function (name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) {
            return unescape(arr[2]);
        }
		return null;
    },
    setCookie : function (name, value, expiredays) {
        var exdate, cookieString;
        exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        cookieString = name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;" + "domain=.huaweicloud.com;";
        document.cookie = cookieString;
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
(function(){
    var privacyNavObj = {
        'en-US':'<div class="privacy-popup" pep-nocheck-matedata>'+
            '<div class="privacy-setting-content">'+
                '<div class="notice">'+
                    '<i class="privacy-icon"></i>'+
                    '<p class="notice-content"><span>We use cookies to improve our site and your experience. By continuing to browse our site you accept our cookie policy.</span>'+
                    '<a href="https://www.huaweicloud.com/intl/en-us/declaration/sa_cookies.html" target="_blank">Find out more</a>'+
                    '</p>'+
                '</div>'+
                '<div class="setting-btns">'+
                    '<i class="popup-closed"></i>'+
                '</div>'+
            '</div>'+
        '</div>',
        'zh-CN':'<div class="privacy-popup" pep-nocheck-matedata>'+
            '<div class="privacy-setting-content">'+
                '<div class="notice">'+
                    '<i class="privacy-icon"></i>'+
                    '<p class="notice-content"><span>我们使用cookie来确保您的高速浏览体验。继续浏览本站，即表示您同意我们使用cookie。</span>'+
                    '<a href="https://www.huaweicloud.com/intl/zh-cn/declaration/sa_cookies.html" target="_blank">详情</a>'+
                    '</p>'+
                '</div>'+
                '<div class="setting-btns">'+
                    '<i class="popup-closed"></i>'+
                '</div>'+
            '</div>'+
        '</div>',
        'es-US':'<div class="privacy-popup" pep-nocheck-matedata>'+
            '<div class="privacy-setting-content">'+
                '<div class="notice">'+
                    '<i class="privacy-icon"></i>'+
                    '<p class="notice-content"><span>Utilizamos cookies para mejorar nuestro sitio y tu experiencia. Al continuar navegando en nuestro sitio, tú aceptas nuestra política de cookies.</span>'+
                    '<a href="https://www.huaweicloud.com/intl/es-us/declaration/sa_cookies.html" target="_blank">Descubre más</a>'+
                    '</p>'+
                '</div>'+
                '<div class="setting-btns">'+
                    '<i class="popup-closed"></i>'+
                '</div>'+
            '</div>'+
        '</div>',
        'pt-BR':'<div class="privacy-popup" pep-nocheck-matedata>'+
            '<div class="privacy-setting-content">'+
                '<div class="notice">'+
                    '<i class="privacy-icon"></i>'+
                    '<p class="notice-content"><span>Usamos cookies para aprimorar nosso site e sua experiência. Ao continuar a navegar em nosso site, você aceita nossa política de cookies.</span>'+
                    '<a href="https://www.huaweicloud.com/intl/pt-br/declaration/sa_cookies.html" target="_blank">Saiba mais</a>'+
                    '</p>'+
                '</div>'+
                '<div class="setting-btns">'+
                    '<i class="popup-closed"></i>'+
                '</div>'+
            '</div>'+
        '</div>',
    }
   
    var currLang = $("html").attr("lang");
    var privacyNav = privacyNavObj[currLang] || privacyNavObj['en-US'];
    
    var site = $("html").attr("site");
    var currentCookieSetting = "";

    if(site == "hk"){
        currentCookieSetting = window.$PrivacyUtil.getCookie("agreed-cookiepolicy");
        if(currentCookieSetting == null){
            $( privacyNav ).insertAfter( "#content" );
            
        }
    }

    // close setting dialog
    $(document).on('click',".privacy-popup .popup-closed", function(){
        console.log(window.$PrivacyUtil.setCookie);
        window.$PrivacyUtil.setCookie("agreed-cookiepolicy",1,7)
        $(this).closest(".privacy-popup").remove();
    });


})();
