$(function() {
    exitGrayTag();
    $(".user-info .logout").click(function(event){
        if(getGrayCookie('gpbc')){
            delGrayCookie('gpbc', '.huaweicloud.com');
        }
    });
})

function exitGray() {
    delGrayCookie('gpbc', '.huaweicloud.com');
    alert("退出灰度操作：登出灰度账号 -> 点击“退出灰度” -> “Ctrl+F5”清理浏览器缓存");
    window.location.reload();
}

function exitGrayTag() {
    if (getGrayCookie('gpbc') && $('#footer').length > 0) {
        var tag ='';
        if (getGrayCookie('gpbc') == 'pass_gray') {
            tag = '<div style="position:fixed;z-index:98;bottom:50%;right:20px;color:#6f8be4;font-size: x-large;"><a href="javascript:void(0)" onclick="exitGray()" title="退出PaaS灰度">退出PaaS灰度</a></div>';
        } else if (getGrayCookie('gpbc') != 'pass_prod'){
            tag = '<div style="position:fixed;z-index:98;bottom:50%;right:20px;color:#6f8be4;font-size: x-large;"><a href="javascript:void(0)" onclick="exitGray()" title="退出灰度">退出灰度</a></div>';
        }
        $('#footer').prepend(tag);
    }
}

function getGrayCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return '';
}

function delGrayCookie(name, domain) {
    document.cookie = name + '=' + getGrayCookie(name) + ';expires=' +
        (new Date(1)) + ';domain=' + domain + ';path=/';
}