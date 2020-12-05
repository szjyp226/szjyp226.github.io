
function endCustomer(){
	if( /pcloudApp/i.test(navigator.userAgent) ) {
		hideAllSome();
      }else{
  		var str = location.search;
  		var suband = "type=android";
  		var subios = "type=ios";
  		if( findStr(str,subios) || findStr(str,suband) ){
			hideAllSome();
  		}
	}
}
function findStr(a,b){
	return a.indexOf(b)>=0;
}
function hideAllSome(){
    $(".product-banner-btn-group a:contains(立即购买)").closest("a").css("display","none");
	$("[meta-data-adjust-app = hide]").css("display","none");
	$(".poster-actions-btns span:contains(立即购买)").closest(".aui-button").css("display","none");
	$(".btn-group .btn:contains(立即购买)").closest(".btn").css("display","none");
	$(".poster-actions-btns a:contains(立即购买)").closest(".aui-btn-red").css("display","none");
	$(".product-buy .act-btn.act-btn-def:contains(立即购买)").closest(".act-btn-def").css("display","none");
	$(".banner-actions .btn-def span:contains(价格计算器)").closest(".btn-def").css("display","none");
	$(".poster-actions-btns a:contains(价格计算器)").closest("a").css("display","none");
	$(".poster-actions a:contains(价格计算器)").closest("a").css("display","none");
	$(".meal-buy .act-btn.act-btn-def:contains(立即购买)").closest(".act-btn-def").css("display","none");
	$(".slider-box .slider-button.btn:contains(立即购买)").closest(".slider-button").css("display","none");
	$(".product-config-card .cui-btn:contains(立即购买)").css("display","none");
	$("#content").css({"padding-top":"0","backgroundPositionY":"0"})
}
endCustomer();


// meta-data-adjust-app="hide"