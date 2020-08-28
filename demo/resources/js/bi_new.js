/**
 * @author Joey 2018-09-12
 * @param {string} domain_pre host of current page, for example: www, acitvity, bbs, etc.
 * @param {object} jsonParamEvent The extended parameter is defined by the json string method. 
 * 				   It is mainly used to pass in some public parameters or specific parameters, such as user account identifier UserAccount, 
 * 				   sub-user ID MemberID, whether to enable debug mode parameter isdebug, etc.
 * @description 
 *    Set bi event tracking automatically when there is no manual event tracking on the target element(or its parent elements). 
 *    First parse all elements and get elements which show report bi event tracking. Then bind click event on those elements.
 *    In the click event callback function, the code will evaluate bi report string by text of the element, bi_name and bi_parent_name 注意事项
 *    on the parents doms before call the sendBiReport function.
 * 	  Cautions: The following variables of current page need to be defined before execution autoEventTracking.
 * 			window.pageMatedataPrefix   -------------------   E.g  "www_china_zh-cn_product_evs.click."  
 * 			window.headerMatedataPrefix   -----------------   E.g  "www_china_zh-cn_product_evs_navigation.click."  
 * 			window.footerMatedataPrefix   -----------------   E.g  "www_china_zh-cn_product_evs_footer.click."
 * 			window.registerMatedataPrefix  ----------------   E.g  "www_china_zh-cn_product_evs_register.click."
 * 			window.serviceMatedataPrefix  -----------------   E.g  "www_china_zh-cn_product_evs_service.click."
 * 	  Detailed rules please check event tracking rules.
 */
function autoEventTracking(domain_pre, jsonParamEvent) {
	lazyTracking(domain_pre, jsonParamEvent);
}

/**
 * @author Joey 2018-09-12
 * @param {string} domain_pre host of current page, for example: www, acitvity, bbs, etc.
 * @param {object} jsonParamEvent The extended parameter is defined by the json string method. 
 * 				   It is mainly used to pass in some public parameters or specific parameters, such as user account identifier UserAccount, 
 * 				   sub-user ID MemberID, whether to enable debug mode parameter isdebug, etc.
 * @description 
 * 		Auto tracking for searchbox in header、support center page
 */
function autoTrackForSearchBox2019(domain_pre, jsonParamEvent) {
	// new track attribute
	$(document).on("mousedown keypress keydown", function (e) {

		var ge_get;

		if (e.type == "mousedown") {
			var $this = $(e.target).closest("[mate_data_ts_v2]");
			if ($this.length == 0) {
				return;
			}
			ge_get = $this.attr("mate_data_ts_v2");
		} else if (e.type == "keydown" || e.type == "keypress") {
			if (e.keyCode != 13) {
				return;
			}
			var $this = $(e.target);
			var id = $this.attr("id");
			ge_get = $("[bi_name='#" + id + "']").attr("mate_data_ts_v2");
		}

		if (!ge_get) {
			return;
		}
		// example: ec.ea.el   mate_data_ts_v2_pageposition
		var ge_gets = ge_get.split('.');
		if (ge_gets.length) {
			var value2 = '';
			if (ge_gets[2] != '') {
				value2 = ge_gets[2];
			}


			var tempObj = {}, extendParamEvent;
			var attrs = $this[0].attributes;
			$.each(attrs, function (index, attribute) {
				if (attribute.name.indexOf("mate_data_ts_v2_") == 0) {
					var tempArr = attribute.name.split("mate_data_ts_v2_");
					if (tempArr.length > 1) {
						var name = attribute.name.split("mate_data_ts_v2_")[1];
						tempObj[name] = attribute.value;
					}
				}
			});

			extendParamEvent = $.extend({}, jsonParamEvent, tempObj);

			onEvent((ge_gets[0] || '').replace("#domain_pre#", domain_pre), ge_gets[1] || '', value2 || '', 1, extendParamEvent);

		}
	});
}

/**
 * @author Joey 2019-09-16
 * @param {Element} event target
 * @description 
 * 		return this element if it should be report, otherwise return null.
 */
function shouldReport(el) {
	var $el = $(el);

	// Compatible with old code.
	if (($el.closest("[mate_data_ts]").length > 0 && !!$el.closest("[mate_data_ts]").attr("mate_data_ts")) || $el.closest("[pep-nocheck-matedata]").length > 0) {
		return;
	}

	var flag_href = !!$el.attr('href'),
		flag_jqClick = false,
		flag_onclick = !!el.onclick,
		flag_dataclickable = ($el.attr('data-clickable') == "true"),
		flag_biName = !!($el.attr('bi_name')),
		flag_dataclickable_asyn = ($el.attr('data-clickable-asyn') == "true"),
		flag_button = $el.is("button"),
		flag_a = $el.is("a"),
		flag_li = $el.is("li");

	var jqEvents = $._data(this, 'events');

	// 绑定了click事件（非委托）
	flag_jqClick = jqEvents && jqEvents.click && jqEvents.click.length > jqEvents.click.delegateCount;

	if (flag_href || flag_jqClick || flag_biName || flag_onclick || flag_dataclickable || flag_dataclickable_asyn || flag_button || flag_a || flag_li) {
		return el;
	}

	var in_dataclickable = $el.closest("[data-clickable='true']"),
		in_biName = $el.closest("[bi_name]"),
		in_dataclickable_asyn = $el.closest("[data-clickable-asyn='true']"),
		in_button = $el.closest("button"),
		in_a = $el.closest("a");
	if (in_dataclickable.length > 0) {
		return in_dataclickable;
	}
	if (in_dataclickable_asyn.length > 0) {
		return in_dataclickable_asyn;
	}
	if (in_button.length > 0) {
		return in_button;
	}
	if (in_a.length > 0) {
		return in_a;
	}
	if (in_biName.length > 0) {
		return in_biName
	}
	return null;
}

/**
 * @author Joey 2018-09-12
 * @param {string} domain_pre host of current page, for example: www, acitvity, bbs, etc.
 * @param {object} jsonParamEvent The extended parameter is defined by the json string method. 
 * 				   It is mainly used to pass in some public parameters or specific parameters, such as user account identifier UserAccount, 
 * 				   sub-user ID MemberID, whether to enable debug mode parameter isdebug, etc.
 * @description 
 * 		Auto tracking for common element event (except search) use new tracking rule of 2018.
 */
function autoTrackForCommonEle2018(domain_pre, jsonParamEvent) {

	var clickTimeStamp;

	$(document).on("mousedown touchend", function (e) {

		if (e.type == "touchend" && $(e.target).closest(".swiper-wrapper").length == 0) {
			return;
		}

		if (e && clickTimeStamp == e.timeStamp) {
			return;
		}

		var _this = shouldReport($(e.target));
		if (!_this) {
			return;
		}
		if (_this.closest("[mate_data_ts]").length != 0) {
			return;
		}

		// 类似ECS下拉框中option的场景,不处理轮播卡片
		if (_this.closest('data-clickable-asyn').length != 0 && _this.prop("tagName") == "LI") {

			if (_this.hasClass("slide-item")) {
				return;
			}
			var parentEles = _this.parents("[bi_parent_name]");
			var parentStr = "";
			for (var i = parentEles.length; i > 0; i--) {
				parentStr += $(parentEles[i - 1]).attr("bi_parent_name").split(".").join("") + "_";
			}
			var textStr = _this.attr("bi_name") || _this.text().trim();
			var ge_get = window.pageMatedataPrefix + parentStr + (textStr.indexOf("http") == 0 ? textStr : textStr.split(".").join(""));
			sendBiReport(ge_get, domain_pre, jsonParamEvent);
			clickTimeStamp = e.timeStamp;
			return;
		}

		if (_this.find("[mate_data_ts]").length != 0) {
			return;
		}

		if (_this.hasClass("J-search-input")) {
			return;
		}

		if (_this.is("button") && _this.parent().is("a")) {
			return;
		}

		// 第一次点击的时候，会将mate_data_ts生成上，如果再次点击，则直接使用，不用再生成埋点标志
		var ge_get = _this.attr('mate_data_ts');

		if (ge_get == undefined) {

			// 上层和本层模块文本
			var parentEles = _this.parents("[bi_parent_name]");
			var parentStr = "";
			for (var i = parentEles.length; i > 0; i--) {
				parentStr += $(parentEles[i - 1]).attr("bi_parent_name").split(".").join("") + "_";
			}
			var textStr = _this.attr("bi_name") || _this.text().trim().split('\n')[0];

			// 处理页头搜索场景
			if (textStr == "searchresult-search-input") {
				textStr = $(textStr).val();
			}

			if (_this.attr("bi_name") && _this.attr("bi_name").indexOf("#") == 0) {
				textStr = $(textStr).val() || $(textStr).attr("placeholder") + "_defaultSearch";
			}

			if (!textStr) {
				textStr = "";
			}

			var ge_get = window.pageMatedataPrefix + parentStr + (textStr.indexOf("http") == 0 ? textStr : textStr.split(".").join(""));

			if (_this.closest("#header").length > 0) {
				ge_get = window.headerMatedataPrefix + parentStr + textStr;
			} else if (_this.closest("#footer").length > 0) {
				ge_get = window.footerMatedataPrefix + parentStr + textStr;
			} else if (_this.closest(".register-area").length > 0) {
				ge_get = window.registerMatedataPrefix + parentStr + textStr;
			} else if (_this.closest(".footer-service").length > 0) {
				ge_get = window.serviceMatedataPrefix + parentStr + textStr;
			}

		}
		var tempObj;
		if (_this.attr("pageposition")) {
			tempObj = $.extend({}, jsonParamEvent, { "pagePosition": _this.attr("pageposition") });
		}
		
		//remove intelligent propeties by king
		tempObj = tempObj ? tempObj : jsonParamEvent;
		
		if(tempObj){
			delete tempObj.ab_test;
			delete tempObj.ab_version;
			delete tempObj.rec_channel;
			delete tempObj.rec_material;
		}

		sendBiReport(ge_get, domain_pre, tempObj);
		clickTimeStamp = e.timeStamp;
	});
}

function getCurrentEC() {
	var pathname = window.location.pathname;
	if (pathname == "/") {
		return "index";
	} else {
		return window.location.pathname.replace(".html", "").replace("/", "").replace("/", "_");
	}
}

function getContainerName(el) {
	var parentEles = el.parents("[bi_parent_name]");
	var parentStr = "";
	for (var i = parentEles.length; i > 0; i--) {
		parentStr += $(parentEles[i - 1]).attr("bi_parent_name").split(".").join("") + (i == 1 ? "" : "_");
	}
	return parentStr;
}

function getBiName(el) {
	return el.attr("bi_name") || el.text().trim().split('\n')[0] || el.closest("[bi_name]").attr("bi_name") || el.closest("[data-clickable]").text().trim().split('\n')[0] || "";
}

function getECType(el) {
	// bi_type attribute > parents bi_type attribute(set bi_type for an area) > special button default type(Buy product) > blank string
	if (el.attr("bi_type")) {
		return el.attr("bi_type");
	} else if (el.closest("[bi_type]").length > 0) {
		return el.closest("[bi_type]").attr("bi_type");
	} else if (el.text().trim() == "立即购买" || el.text().trim() == "Buy Now" || el.text().trim().indexOf("购买") != -1) {
		return "purchase_intention";
	} else {
		return "";
	}
}

function getEventType(el) {
	if (el.attr("bi_event")) {
		return el.attr("bi_event");
	} else if (el.closest("[bi_event]").length > 0) {
		return el.closest("[bi_event]").attr("bi_event");
	}
	return "click";
}

function getSpecification(el) {
	return el.attr("bi_spec") || "";
}

/**
 * @author Joey 2019-09-16
 * @param {string} domain_pre host of current page, for example: www, acitvity, bbs, etc.
 * @param {object} jsonParamEvent The extended parameter is defined by the json string method. 
 * 				   It is mainly used to pass in some public parameters or specific parameters, such as user account identifier UserAccount, 
 * 				   sub-user ID MemberID, whether to enable debug mode parameter isdebug, etc.
 * @description 
 * 		Auto tracking for common element event (except search) use new tracking rule of 2019. Example: 
 * 		Ec: purchase_intention_$currentEC_$楼层名称_$tableName
 *		Ea: click_$实例类型_$buttonName
 *		El: $productName_$版本_$规格
 */
function autoTrackForCommonEle2019(domain_pre, jsonParamEvent) {
	var clickTimeStamp;

	$(document).on("mousedown", function (e) {
		if (e && e.button != 0) {
			return;
		}
		if (e && clickTimeStamp == e.timeStamp) {
			return;
		}

		var tmpEle = shouldReport($(e.target));
		if (!tmpEle) {
			return;
		}

		clickTimeStamp = e.timeStamp;
		var _this = $(e.target);

		// purchase_intention/recommendation/filter...
		var currentBtnType = getECType(_this);
		var currentEC = window.mate_data_ts_pageType || getCurrentEC();
		var containerName = getContainerName(_this);
		if(_this.closest("[bi_parent_name='navigation']").length ) {
			currentEC = "huaweicloud";
		}

		var EC = currentBtnType ? (currentBtnType + "_" + currentEC + "_" + containerName) : (currentEC + "_" + containerName);

		var currentEventType = getEventType(_this);
		var textStr = getBiName(_this);
		var EA = currentEventType + "_" + textStr.split(".").join(" ");

		var EL = getSpecification(_this);

		var ge_get = EC + "." + EA + "." + EL;

		var tempObj = {};
		if (_this.attr("pageposition")) {
			tempObj = $.extend({}, jsonParamEvent, { "pagePosition": _this.attr("pageposition") });
        }
        
        var extendParamEvent = {};
		if(window.ab_test) {
			extendParamEvent.ab_test = window.ab_test;
		}
		if(window.ab_version ) {
			extendParamEvent.ab_version  = window.ab_version;
        }
        
		var attrs = tmpEle[0].attributes;
		$.each(attrs, function (index, attribute) {
			if (attribute.name.indexOf("bi_param_") == 0) {
				var tempArr = attribute.name.split("bi_param_");
				if (tempArr.length > 1) {
					var name = attribute.name.split("bi_param_")[1];
					if(!tempObj) {
						tempObj = {};
					}
					tempObj[name] = attribute.value;
				}
			}
		});

		$.extend(extendParamEvent, jsonParamEvent, tempObj);

		sendBiReport(ge_get, domain_pre, extendParamEvent);
		clickTimeStamp = e.timeStamp;
	});
}

function lazyTracking(domain_pre, jsonParamEvent) {
	autoTrackForSearchBox2019(domain_pre, jsonParamEvent);
	autoTrackForCommonEle2018(domain_pre, jsonParamEvent);
	autoTrackForCommonEle2019(domain_pre, jsonParamEvent);
}


/**
 * @author Joey 2018-09-12
 * @param {string} ge_get Bi event tracking string, for example: www_china_zh-cn_product_evs.click.banner_help.
 * @param {string} domain_pre host of current page, for example: www, acitvity, bbs, etc.
 * @param {object} jsonParamEvent The extended parameter is defined by the json string method. 
 * 				   It is mainly used to pass in some public parameters or specific parameters, such as user account identifier UserAccount, 
 * 				   sub-user ID MemberID, whether to enable debug mode parameter isdebug, etc.
 * @param {number} viewTime Intervals of the banner or the floor.
 * @description 
 *    Call onEvent to send bi report to backend. 
 */
function sendBiReport(ge_get, domain_pre, jsonParamEvent, viewTime) {

	if (viewTime && viewTime <= 0) {
		viewTime = 1;
	}

	var ge_gets = ge_get.split('.');
	// deal with banner click event, should add target url in event label
	if (ge_gets.length > 3) {
		var tempGeGet = ge_gets.slice(2).join(".");
		ge_gets.length = 3;
		ge_gets[2] = tempGeGet;
	}

	if (ge_gets.length) {
		var value2 = '';
		if (ge_gets[2] != '') {
			value2 = ge_gets[2]; // + "_" + window.location.href;
		}
		var activity = ge_gets[3];
		if (typeof (onEvent) !== 'undefined') {
			if ('recommendation' === ge_gets[0]) {
				// recommendation in header
				onEvent(ge_gets[0], 'click', ge_gets[2], ge_gets[3], { "D1": "FIRST_PARTY", });
			} else {
				if (activity != undefined) {
					jsonParamEvent.D17 = activity;
					onEvent((ge_gets[0] || '').replace("#domain_pre#", domain_pre), ge_gets[1] || '', value2, (viewTime || 1), jsonParamEvent);
				} else {
					onEvent((ge_gets[0] || '').replace("#domain_pre#", domain_pre), ge_gets[1] || '', value2, (viewTime || 1), jsonParamEvent);
				}
			}
		}
	}
}
