function getCustomerCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return decodeURI(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

var uaCookies = getCustomerCookie("ua");
var uaLocalStorage = window.localStorage && localStorage.getItem("ua");
var uaId = uaCookies || uaLocalStorage;

if (!uaId) {
    var vkCookies = getCustomerCookie("vk");
    var vkLocalStorage = window.localStorage && localStorage.getItem("vk");
    uaId = vkCookies || vkLocalStorage;
}

var rec_material = "";
var rec_source = "";
var rec_position ="";
function removeIntelligent() {
    if (rec_material) {
        window.productparam.rec_material = rec_material.slice(0,rec_material.length-1);
    }
    if(rec_source){
        window.productparam.rec_source = rec_source.slice(0,rec_material.length-1);
    }
    if(rec_position){
        window.productparam.rec_position = rec_position.slice(0,rec_material.length-1);
    }
    $(".intelligent-product").remove();
    $(".product-remove").remove();
}

function position(productIFlag){
    return 'r'+Math.floor(productIFlag/3+1)+'_c'+(productIFlag%3+1);
}

//intelligent

function productIntelligent() {
    $.ajax({
        type: "get",
        headers: {
            "x-auth-customerId": uaId,
        },
        crossDomain: true,
        xhrFields: {
            withCredentials: true,
        },
        url: "https://portal.huaweicloud.com/portalrecommendservice/v1/recommend/homepageProduct?num=100",
        async: true,
        timeout: 3000,
        success: function (data) {
            if (!data || !data.content || data.content.length == 0) {
                removeIntelligent();
                return;
            }
            var content = data.content;

            window.productparam = {
                ab_test: data.ab_test,
                ab_version: data.ab_version,
                rec_channel: data.rec_channel,
                rec_material: "",
                rec_source : "",
                rec_position:"",
            };

            var productIDom = $('.section-product .intelligent-product .product-i');
            var productIFlag = 0;
            //match recommend service
            for (var i = 0; i < content.length; i++) {
                for (var j = 0; j < productIDom.length; j++) {
                    var temp = $(productIDom[j]).attr('meta-data-product-i');
                    if (temp == content[i].id) {
                        var dataTitleI=$(productIDom[j]).attr('data-title');
                        var dataTitleN= $('.product-n:not(.product-remove)[data-title="'+dataTitleI+'"]');

                        $(productIDom[j]).find("a.por-btn").attr({
                            'bi_param_ab_test': data.ab_test,
                            'bi_param_ab_version': data.ab_version,
                            'bi_param_rec_channel': data.rec_channel,
                            'bi_param_rec_material': content[i].id,
                            'bi_param_rec_source': content[i].source,
                            'bi_param_rec_position':position(productIFlag),
                        });
                        rec_material = rec_material + content[i].id + ";";
                        rec_source = rec_source + content[i].source +";";
                        rec_position = rec_position +position(productIFlag) +";";

                        $($(productIDom[j]).clone()).insertBefore('.section-product .intelligent-product');
                        $(productIDom[j]).addClass('product-i-selected');

                        if (dataTitleN.length) {
                            $(dataTitleN[0]).addClass("product-remove");
                        } else {
                            var productN = $(".product-n:not(.product-remove)");
                            $(productN[productN.length - 1]).addClass("product-remove");
                        }

                        if (++productIFlag >= 9) {
                            removeIntelligent();
                            return;
                        }
                    }
                }
            }
            for (productIFlag; productIFlag < 9; productIFlag++) {
                var productIDomNot = $(".section-product .intelligent-product .product-i:not(.product-i-selected)");
                $(productIDomNot[0]).find("a.por-btn").attr({
                    'bi_param_ab_test': "default",
                    'bi_param_ab_version': "default",
                    'bi_param_rec_channel': "default",
                    'bi_param_rec_material': $(productIDomNot[0]).attr('meta-data-product-i')||'default',
                    'bi_param_rec_source': "default",
                    'bi_param_rec_position':position(productIFlag),
                });
                rec_material = rec_material + ($(productIDomNot[0]).attr('meta-data-product-i')||'default') + ";";
                rec_source += "default;";
                rec_position = rec_position +position(productIFlag) +";";

                if (productIDomNot.length) {
                    $($(productIDomNot[0]).clone()).insertBefore(".section-product .intelligent-product");
                    $(productIDomNot[0]).addClass('product-i-selected');
                    var dataTitleNTemp= $('.product-n:not(.product-remove)');
                    if (dataTitleNTemp.length) {
                        $(dataTitleNTemp[0]).addClass("product-remove");
                    }
                }else{
                    productIFlag = 9;
                }
            }
            removeIntelligent();
        },
        error: function () {
            removeIntelligent();
        },
    });
}

window.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        if ($('.section-product .intelligent-product').length) {
            productIntelligent();
        } else {
            removeIntelligent();
        }
    }, 20);
});