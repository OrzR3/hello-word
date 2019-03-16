;
(function() {
	var mylib = {};
	/***
	 * 获取url参数
	 * @param key
	 * @returns 
	 */
	mylib.get_request_params = function(key) {
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return r[2];
		}
		return null;
	};
	var formwork = mylib.get_request_params("formwork"); //当前模板
	formwork = common.isNull(formwork) ? "4klt" : formwork;
	mylib.isTest = false;
	//根据模板，选择参数
	switch(formwork) {
		case "4klt":
		case "4klt":
			mylib.mg_img_url = "http://113.247.247.182:8080/images/firstpageposter/";
			mylib.mg_url = "http://58.20.27.5/MemberInterface/";
			mylib.mg_url_phone = "http://h5.hunaniptv.com/sms/";
			mylib.video_url = "com.mgtv.hndx.prop.mgplayer.MgVodPlayerActivity"; //视频播放
			mylib.mg_url_stats = "http://119.39.13.155:80/"; //统计代码
			mylib.fromsource = "5"; //联通标识
			mylib.member_menter_url = "http://58.20.27.5/MemberInterface/GetActiveInfo?";
			// mylib.mg_sp_url= "../../nn_cms/nn_cms_view/mgtv_hndx/n3_a_a.php";
			mylib.mg_sp_url = "http://119.39.13.251/nn_cms/nn_cms_view/mgtv_hndx/n3_a_a.php";
			//3a测试地址
			//mylib.aaa_url = "http://119.39.13.136:8080/";
			//mylib.cms_url = "http://119.39.13.137/";
			//3a接口正式地址：
			mylib.aaa_url = "http://119.39.13.142:80/";
			mylib.cms_url = "http://119.39.13.251:80/";
			/*订购选择页改用新的地址，只穿产品id，下面这个不用了*/
			mylib.order_url = "http://119.39.13.155:8080/en/my_module/order/choose.html"; //订购选择页url
			//测试
			//mylib.mg_sp_url= "http://119.39.13.251/nn_cms/nn_cms_view/mgtv_hndx/n3_a_a.php";
			break;
		case "ws":
			mylib.mg_img_url = "http://113.247.247.182:8080/images/firstpageposter/";
			mylib.mg_url = "http://10.255.0.219:8080/";
			mylib.mg_url_phone = "http://124.232.135.200:1961/sms/";
			mylib.mg_sp_url = "http://10.255.0.74/nn_cms/nn_cms_view/mgtv_hndx/n3_a_a.php";
			mylib.mg_url_stats = "http://124.232.135.200:1961/";
			mylib.video_url = "com.mgtv.hndx.prop.mgplayer.MgVodPlayerActivity"; //视频播放
			mylib.fromsource = "4"; //电信标识

			mylib.member_menter_url = "http://10.255.0.219:8080/MemberInterface/GetActiveInfo?"; //会员中心
			//测试
			//mylib.member_menter_url="http://h5.hunaniptv.com/Agent/?action=GetActiveInfo&";
			break;
		default:
			formwork = "4k";
			mylib.mg_img_url = "http://113.247.247.182:8080/images/firstpageposter/";
			mylib.mg_url = "http://10.255.0.219:8080/";
			mylib.mg_url_phone = "http://124.232.135.200:1961/sms/";
			mylib.mg_sp_url = "http://10.255.0.74/nn_cms/nn_cms_view/mgtv_hndx/n3_a_a.php";
			mylib.mg_url_stats = "http://124.232.135.200:1961/";
			mylib.video_url = "com.mgtv.hndx.prop.mgplayer.MgVodPlayerActivity"; //视频播放
			mylib.fromsource = "4"; //电信标识

			mylib.member_menter_url = "http://10.255.0.219:8080/MemberInterface/GetActiveInfo?"; //会员中心
			//测试
			//mylib.member_menter_url="http://h5.hunaniptv.com/Agent/?action=GetActiveInfo&";
			break;
	}
	mylib.KEY_UP = "UP";
	mylib.KEY_DOWN = "DOWN";
	mylib.KEY_LEFT = "LEFT";
	mylib.KEY_RIGHT = "RIGHT";
	mylib.KEY_SELECT = "ENTER";
	mylib.KEY_BACK = "BACK";
	mylib.KEY_PAGEUP = "PAGEUP";
	mylib.KEY_PAGEDOWN = "PAGEDOWN";
	mylib.KEY_MOVE = true; //默认焦点可以移动；
	mylib.bind_key = function(focus_manage) {

		try {
			Webview.requestFocus();
			Webview.setKeyEventHandler(function(action, keyCode, keyName, metaState) {
				if(keyCode == 92) keyName = "PAGEUP";
				else if(keyCode == 93) keyName = "PAGEDOWN";
				var fn = focus_manage[focus_manage.area];
				if(typeof fn === "function") {
					if(mylib.KEY_MOVE)
						fn(keyName);
				}
			});
		} catch(e) {
			//监听按键
			document.onkeydown = function(event) {

				mylib.KEY_UP = 38;
				mylib.KEY_DOWN = 40;
				mylib.KEY_LEFT = 37;
				mylib.KEY_RIGHT = 39;
				mylib.KEY_SELECT = 13;
				mylib.KEY_PAGEUP = 33;
				mylib.KEY_PAGEDOWN = 34;
				var e = event || window.event || arguments.callee.caller.arguments[0];
				if(e) {
					var fn = focus_manage[focus_manage.area];
					if(typeof fn === "function") {
						if(mylib.KEY_MOVE)
							fn(e.keyCode);
					}
				}

			};
		}
	};

	/***
	 * 获取url参数
	 * @param key
	 * @returns {*}
	 */
	mylib.getURLParameter = function(param, url) {

		var params = (url.substr(url.indexOf("?") + 1)).split("&");
		if(params != null) {
			for(var i = 0; i < params.length; i++) {
				var strs = params[i].split("=");
				if(strs[0] == param) {
					return strs[1];
				}
			}
		}
		return "";
	};

	/***
	 * 获取用户信息
	 * @param callback
	 */
	mylib.get_user_phone = function(opt, callback) {
		$.ajax({
			type: "get",
			//          url : "http://124.232.135.200:1961/sms/?action=querymember&userid="+
			//          (mylib.user_id==""?"6830017":mylib.user_id),  

			url: mylib.mg_url + "MemberInterface/isPhone?&userid=" + (mylib.user_id == "" ? "6830017" : mylib.user_id) + "&usertoken=" + mylib.token + "&terminalType=&mac=" + mylib.device_mac + "&apkVer=" + mylib.app_version,
			dataType: "jsonp",
			success: function(res) {
				var data = res;
				if(typeof callback === "function") {
					callback(data);
				}
			},
			error: function(res) {
				//console.log('获取投票失败');
				//console.log(res);
			}
		});
	};

	/**
	 * 对数据进行倒叙处理
	 * @param json
	 * @returns
	 */
	mylib.sort_json_data = function(json) {
		var json_object = json;
		var array_object = json_object.index_list.index;
		var array_size = array_object.length;

		var json_array = new Array();
		for(var i = 0; i < array_size; i++) {
			json_array[i] = array_object[array_size - i - 1];
		}

		json_object.index_list.index = json_array;
		return json_object;
	};

	/***
	 * 电话号码验证接口
	 * @param opt object
	 * item_id 选项编号
	 * selection 1：点赞  -1：吐槽
	 * @param callback
	 */

	mylib.phone_validate = function(callback) {

		$.ajax({
			type: "get",
			url: mylib.mg_url_phone + "?userid=" + (mylib.user_id == "" ? "67500017779" : mylib.user_id) + "&action=query2&topicsid=childrensSong",
			dataType: "jsonp",
			success: function(res) {
				if(typeof callback === "function") {
					callback(res);
				}
			},
			error: function(res) {
				//console.log("点赞失败");
				//console.log(res);
			}
		});
	};

	/***
	 * 输入手机获取验证码后需要提交验证码
	 * @param opt object
	 * item_id 选项编号
	 * selection 1：点赞  -1：吐槽
	 * @param callback
	 */

	mylib.submit_validate = function(opt, callback) {

		$.ajax({
			type: "get",
			//http://h5.hunaniptv.com/sms/?topicsid=iamsinger4&code=123456&smsid=aaaa&action=valid
			url: mylib.mg_url_phone + "?topicsid=iamsinger4&code=" + opt.code + "&smsid=" + opt.smsid + "&action=valid",
			dataType: "jsonp",
			success: function(res) {
				if(typeof callback === "function") {
					callback(res);
				}
			},
			error: function(res) {
				//console.log("点赞失败");
				//console.log(res);
			}
		});
	};

	/***
	 * 获取手机验证码
	 * @param callback
	 */
	mylib.get_validate_number = function(opt, callback) {
		$.ajax({
			type: "get",
			//url : "http://124.232.146.88:8084/?userid=" + (mylib.user_id==""?"67500017777":mylib.user_id)+"&action=send&topicsid=iamsinger4&tel="+opt.phone_number,
			url: mylib.mg_url_phone + "?userid=" + (mylib.user_id == "" ? "67500017779" : mylib.user_id) + "&action=send&topicsid=" + opt.topicsid + "&tel=" + opt.phone_number,
			dataType: "jsonp",
			success: function(res) {
				var data = res;
				if(typeof callback === "function") {
					callback(data);
				}
			},
			error: function(res) {
				//console.log('获取投票失败');
				//console.log(res);
			}
		});
	};

	/***
	 * 获取投票结果方法:可用
	 * @param callback
	 */
	mylib.get_pro_list = function(callback) {
		$.ajax({
			type: "get",
			//    		url : "http://124.232.135.200:1961/SuperBoy/?Action=EtvProList9&activityid=195&userid=6800005&pageindex=1&pagesize=50",
			//            url : mylib.mg_url + "superboy/EtvProList9.aspx?activityid=195&pagesize=50&userid=" + (mylib.user_id==""?"67500017777":mylib.user_id),
			url: mylib.mg_url + "superboy/Singer4VoteList.aspx?activityid=236&pagesize=500&userid=" + (mylib.user_id == "" ? "67500017777" : mylib.user_id),
			dataType: "jsonp",
			success: function(res) {
				var data = res;
				//data[1].PraiseCount=12348;//TODO
				if(typeof callback === "function") {
					callback(data);
				}
			},
			error: function(res) {
				//console.log('获取投票失败');
				//console.log(res);
			}
		});
	};

	/***
	 * 对投票结果排序:可用
	 * @param data
	 */
	mylib.sort_pro_data = function(data) {
		if(data instanceof Array) {
			if(data.length < 5) {
				return;
			}
			data.sort(function(v1, v2) {
				if(v2.PraiseCount - 0 > v1.PraiseCount - 0) {
					return 1;
				}
				if(v2.PraiseCount - 0 < v1.PraiseCount - 0) {
					return -1;
				}
			});
			return data;
		}
	};

	/***
	 * 获取专题数据
	 * @param id  专题id
	 * @param callback
	 */
	mylib.get_sp_data_by_id = function(id, callback) {
		//  	alert("url="+mylib.mg_sp_url + "?nns_output_type=jsonp&nns_func=get_video_info_v2&nns_video_id=" + id + //"&nns_video_type=0&nns_page_index=0&nns_tag=26&nns_page_size=999&nns_version=" + mylib.app_version)
		$.ajax({
			type: "get",
			url: mylib.mg_sp_url + "?nns_output_type=jsonp&nns_func=get_video_info_v2&nns_video_id=" + id + "&nns_video_type=0&nns_page_index=0&nns_tag=26&nns_page_size=999&nns_version=" + mylib.app_version,
			dataType: "jsonp",
			jsonp: "nns_jsonp_func",
			success: function(res) {
				if(typeof callback === "function") {
					//alert("成功"+JSON.stringify(res));
					callback(res);
				}
			},
			error: function(res) {
				//alert("失败"+JSON.stringify(res));
				callback(res);
			}
		});
	};

	/***
	 * 获取专题数据(分页)
	 * @param opt("id":"媒资id","currPage":"当前页","pageSize":"每页个数")
	 * @param callback
	 */
	mylib.get_sp_data_by_id_paging = function(opt, callback) {
		$.ajax({
			type: "get",
			url: mylib.mg_sp_url + "?nns_output_type=jsonp&nns_func=get_video_info_v2&nns_video_id=" + opt.id + "&nns_video_type=0&nns_page_index=" + opt.currPage + "&nns_tag=26&nns_page_size=" + opt.pageSize + "&nns_version=" + mylib.app_version,
			dataType: "jsonp",
			jsonp: "nns_jsonp_func",
			success: function(res) {
				if(typeof callback === "function") {
					callback(res);
				}
			},
			error: function(res) {
				callback(res);
				console.log("获取专题失败");
				//console.log(res);
			}
		});
	};
	mylib.jumpOrder = function(opt) {
		var playIntent = {
			action: "com.mgtv.hndx.view.order.OrderMainPage",
			extras: {
				product: {
					"id": opt.id,
					"time": opt.time,
					"product_type": opt.product_type,
					"price": opt.price,
					"button_name": opt.button_name,
					"name": opt.name,
					"bag": opt.bag

					/* "id":"49",
					 "time":"30",
					 "product_type":"2",
					 "price":"2",
					 "button_name":"快乐宠物",
					 "name":"快乐宠物",
					 "bag":"live49_bag"*/
				}
			},
			flags: ["SINGLE_TOP"]
		};
		Webview.sendIntent("startActivity", playIntent);
	}
	/**
	 * 
	 * 
	 * 
	 * SortType：排序方式 可不填 不填默认为default 默认排序time 按发布时间排序click 按点击率排序
	 * Tag：媒资标识
	 * UserAgent:可不填
	 */

	mylib.get_apk_list_data_by_categoryid = function(object, callback) {
		$.ajax({
			type: "get",
			url: mylib.cms_url + "mgtv_hnlt_zx/MAPindex/GetMediaAssetsItemList?" +
				"Version=" + mylib.app_version +
				"&PageSize=" + object.pageSize +
				"&AreaCode=156011001" +
				"&BussId=8000001" +
				"&NetId=6953245123" +
				"&UserId=" + mylib.user_id +
				"&IncludeCategory=0" +
				"&PageIndex=" + object.currPage +
				"&MediaAssetsId=" + object.AssetsId +
				"&CategoryId=" + object.categoryid +
				"&Tag=26" +
				"&SortType=time" +
				"&Output_type=jsonp",
			dataType: "jsonp",
			jsonp: "nns_jsonp_func",
			success: function(res) {
				if(typeof callback === "function") {
					callback(res);
				}
			},
			error: function(res) {
				callback(res);
				//console.log(res);
			}
		});
	};
	//直播全屏播放
	/*
	 * id:媒体id
	 * name:直播名称
	 */
	mylib.livePlayVideo = function(id, name) {
		//alert(id+"~~~"+name);
		var playIntent = {
			action: "com.mgtv.hndx.prop.mgplayer.MgLivePlayerActivity",
			extras: {
				video_type: "1", //视频类型 0:点播 1:直播
				video_id: id,
				video_name: name
			},
			flags: ["SINGLE_TOP"]
		};
		//alert("直播全屏--"+JSON.stringify(playIntent));
		Webview.sendIntent("startActivity", playIntent);
	}

	/***
	 * Ajax数据请求（Get）
	 * @param url
	 * @param callback
	 */
	mylib.ContentLoader = function(url, callback) {
		$.ajax({
			type: "get",
			url: url,
			dataType: "jsonp",
			success: function(res) {
				if(typeof callback === "function") {
					callback(res);
				}
			},
			error: function(res) {
				callback(res);
				//console.log(res);
			}
		});
	};

	/***
	 * 获取item范围内的模版
	 * @param {Object} item 取item里面的模版
	 */
	mylib.get_tpls = function(item) {
		var _tmp = {};
		item = item ? item : $(document);
		item.find(".html_tpl").each(function() {
			var _html = $(this).html();
			var _tpl_id = $(this).data("tpl");
			_tmp[_tpl_id] = _html;
			$(this).html("");
		});
		return _tmp;
	};

	/***
	 *
	 * @param {Object} data 填充的数据对象，必须是对象
	 * @param {Object} tmpl 数据模版html
	 */
	mylib.format_template = function(data, tmpl) {
		//匹配{word.word}
		return tmpl.replace(
			/{(\w+.\w+)}/g,
			function(m1, m2) {
				if(!m2) {
					return "";
				}
				var dot_m2 = m2.split(".");
				var map_m2 = m2.split("|");
				//如果是有嵌套对象的
				if(dot_m2.length > 1) {
					//先只支持嵌套两层对象
					if(data[dot_m2[0]]) {
						return data[dot_m2[0]][dot_m2[1]];
					} else {
						return "";
					}

				}
				//如果是有函数处理的{is_read|map_read}
				if(map_m2.length > 1) {
					return map_m2[1](data[map_m2[0]]);
				}
				return data[m2];
			}
		)
	};

	/**
	 * 由于芒果配置的页面图片比较大， 页面展示时有放大缩小的操作，此时对于图片来说有两个弊端， 文件大，比较占带宽，图片分辨率大，浏览器内存占用较大
	 * 在页面展示过程中，图片会出现压缩拉伸，消耗浏览器性能.
	 *
	 * 这里提供一个图片按照页面展示比例切换的方法
	 *
	 * @param url
	 *            必传参数， 图片的原路径地址
	 * @param size
	 *            必传参数，需要转换为多大分辨率的图片。格式为123x123
	 * @returns url 转换后的图片路径地址
	 */
	mylib.convert_img_size = function(url, size) {
		if(!url) {
			return url;
		}
		if(!size) {
			return url;
		}

		var __a = url.lastIndexOf("/");
		var __s0 = url.substring(0, __a + 1);
		var __s1 = url.substring(__a + 1);

		return __s0 + size + "/" + __s1;
	};

	//+1动画
	mylib.animate_plus_one = function(dom, callback) {
		var $dom = $(dom);
		$dom.css({
			"top": "-5px",
			"left": "-5px",
			"font-size": "22px",
			"opacity": 1
		}).fadeIn(function() {
			$dom.animate({
				"top": "-=80",
				"font-size": "10px",
				"opacity": 0
			}, 1000, function() {
				if(typeof callback === "function") {
					callback();
				}
			});
		});

	};

	mylib.user_id = (function() {
		try {
			var user_id = Webview.readSystemProp("user.id");
			return user_id;
		} catch(e) {
			return "";
		}
	})();

	mylib.app_version = (function() {
		try {
			var appv = Webview.readSystemProp("app.version");
			return appv;
		} catch(e) {
			return "";
		}
	})();

	mylib.device_mac = (function() {
		try {
			var appv = Webview.readSystemProp("device.mac");
			return appv;
		} catch(e) {
			return "";
		}
	})();

	mylib.token = (function() {
		try {
			var userToken = Webview.readSystemProp("user.token");
			//  	            alert(userToken);
			return userToken;
		} catch(e) {
			return "";
		}
	})();

	mylib.terminalType = (function() {
		try {
			var userToken = Webview.getVersion();
			return userToken;
		} catch(e) {
			return "";
		}
	})();

	mylib.format_date = function(date) {
		var ds = date.split(" ")[0].split("-");
		return ds[1] + "月" + ds[2] + "日";
	};

	mylib.lazy_img = function(selecter) {
		$(selecter).find(".lazy_img").each(function() {
			var _this = this;
			var src = $(_this).data("src");
			if(!src) {
				return;
			}
			var img = new Image();
			img.src = src;
			img.onload = function() {
				$(_this).attr("src", src);
			};
		});
	};

	/***
	 * Ajax数据请求（Get）（失败时也回调）
	 * @param url
	 * @param callback
	 */
	mylib.ContentLoader2 = function(url, callback) {
		$.ajax({
			type: "get",
			url: url,
			dataType: "jsonp",
			success: function(res) {
				if(typeof callback === "function") {
					callback(res);
				}
			},
			error: function(res) {
				if(typeof callback === "function") {
					callback();
				}
			}
		});
	};

	mylib.ContentLoader3 = function(url, callback) {
		$.ajax({
			type: "get",
			url: url,
			dataType: "jsonp",
			jsonp: "nns_jsonp_func",
			success: function(res) {
				if(typeof callback === "function") {
					callback(res);
				}
			},
			error: function(res) {
				callback(res);
				//console.log(res);
			}
		});
	};
	/**
	 * 详情页
	 * @param id,三级媒
	 **/
	mylib.details_page = function(id) {
		var playIntent = {
			action: "com.mgtv.hndx.view.movidetails.MovieDetailsActivity",
			extras: {
				video_type: "0",
				video_id: id,
				media_assets_id: "TVseries",
				category_id: ""

			},
			flags: ["SINGLE_TOP"]
		};
		Webview.sendIntent("startActivity", playIntent);
	}

	/***
	 * 播放连续剧
	 * @param opt,父集ID，子集序号，播放类型
	 */
	mylib.play_video = function(opt) {
		var id = opt.id.replace(/\s+/g, "");
		var playIntent = {
			//            action : "com.starcor.hunan.mgtv",//福建移动
			action: mylib.video_url, //湖南电信、湖南联通
			extras: {
				"cmd_ex": "play_video",
				"play_video_direct": 1,
				"video_id": opt.id,
				"video_type": opt.type,
				"video_index": opt.index,
				"video_all_index": opt.index_count,
				"ui_style": opt.ui_style,
				"video_new_index": opt.index_current
			},
			flags: ["SINGLE_TOP"]
		};
		//alert(JSON.stringify(playIntent));
		console.log(playIntent);
		//        Webview.sendIntent("sendBroadcast", playIntent);//福建移动
		Webview.sendIntent("startActivity", playIntent); //湖南电信、湖南联通
	};

	/***   
	 * 获取投票结果方法
	 * @param callback
	 */
	mylib.sd_zan = function(opt, callback) {
		$.ajax({
			type: "get",
			url: mylib.mg_url + "MemberInterface/UserInteraction?activityId=13&itemId=" + itemId + "&count=10&type=2&userId=" +
				mylib.user_id + "&score=1&&usertoken=" + mylib.token + "&mac=" +
				mylib.device_mac + "&apkVer=" + mylib.app_version + "&fromsource=" + mylib.fromsource,
			dataType: "jsonp",
			success: function(res) {
				var data = res;
				//data[1].PraiseCount=12348;//TODO
				if(typeof callback === "function") {
					//alert("成功"+JSON.stringify(res))
					callback(data);
				}
			},
			error: function(res) {
				//              console.log('获取投票失败');
				//              console.log(res);
			}
		});
	};

	/*
	 *专题访问统计
	 *@param id 统计代码
	 */
	mylib.piwik = function(id) {
		id = id + "_" + formwork;
		var timestamp = new Date().getTime();
		var link2load = mylib.mg_url_stats + "Piwik/?TopicsId=" + id + "&UserId=" + (mylib.user_id == "" ? "67500017779" : mylib.user_id) + "&t=" + timestamp;
		var loadNewData = new mylib.ContentLoader2(link2load, function(data) {});
	};

	window.mylib = mylib;

})();