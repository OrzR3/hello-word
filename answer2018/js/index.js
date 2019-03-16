var focus_manage = {};
var parea = mylib.get_request_params("area");
var index = mylib.get_request_params("index");
var type = mylib.get_request_params("type"); //1:调试
var exitStr = mylib.get_request_params("exitStr");
var aId = mylib.get_request_params("activityId");
var video_idx = mylib.get_request_params("video_idx"); //小视频窗播放的下标
common.isNull(parea) ? parea = "navi" : parea = parea;
common.isNull(index) ? index = 0 : index = parseInt(index);
common.isNull(aId) ? aId = 30 : aId = parseInt(aId);
video_idx = common.isNull(video_idx) ? 0 : video_idx;

var listData = {},
	watchList = {},
	collectList = {},
	piwik_id = "wordcup2018_4klt";
var listPageSize = 50;
var naviName = [];
var baseData = [];
var videoData = [];
var c_name_index = "wcb2018_index";
var isShowToday = 0;
var isKnown = 0;

var isFirstLoad = 0;
var type = mylib.get_request_params("type");
common.isNull(type) ? type = 0 : type = parseInt(type);
/*imp*/

if(type == 1) {
	//		mylib.user_id = "073108478526A@tv";
	//	mylib.user_id = "073108971203A@tv";
//	mylib.user_id = "073199999913A@tv";
	mylib.user_id = "073108528007A@tv";
	
	mylib.token = "DHSnXw9e7i_seEXt1ODiQ_M135392310";
	//正式app版本
	//mylib.app_version = "YYS.5.0.0.Y28.0.HNLT.0.0_Pre_Release";
	//预发布app版本
	mylib.app_version = "YYS.5.0.0.Y28.0.HNLT.0.0_Pre_Release";
	mylib.device_mac = "cc-79-cf-01-5e-2e";
	mylib.token = "ZgOOgo5MjkyOTIdLS5mZBTuqS7R8BXxLtKoNhwUFSwYFO3sOdgZ2h6oGDg4OtLQ7qiC0jkyOTI5MZgOOgg%3D%3D";
}
var productStr = "";
var vipFlag = 0; //0表示未订购，1表示已订购
var ip = window.location.hostname;
var stb_id = "00000443000440100001";
var version = mylib.app_version;
//中间小视频
var vodId = "";
var dataJSON = [];
var isBFA = 0;
var isPhone = 0;

var timer = -1;
/*好彩直播的开关*/
var isColorLive = mylib.get_request_params("isColorLive");
common.isNull(isColorLive) ? isColorLive = 0 : isColorLive = parseInt(isColorLive);
var btnLength = 0;

var todayidx = -1;

var todayDate = "";

var todayDate_1 = "";
var todayDate_2 = "";
var todayDate_3 = "";
$(function() {
	common.addExitUrl(exitStr, c_name_index);
	mylib.bind_key(focus_manage);

	mylib.KEY_MOVE = false; //焦点禁止移动
	focus_manage.area = parea;
	focus_manage.idx = index;
	/*统计代码piwik*/
	if(!common.isNull(piwik_id)) {
		setTimeout(function() {
			mylib.piwik(piwik_id);
		}, 500);
	}

	getVoteNum();

	getNaviData();

	//	showNaviList();

	getUserInfo();
});

function getUserInfo() {
	var url_str = "http://58.20.27.5/MemberInterface/GetUserInfo?userId=" +
		mylib.user_id + "&usertoken=" + mylib.token +
		"&fromsource=" + mylib.fromsource;
	mylib.ContentLoader2(url_str, function(res) {
		common.log("url_str", url_str);
		if(res.Result == 0) {
			/*jsonData.Data.phone：手机号码，为空表示未绑定*/
			if(!common.isNull(res.Data.phone)) isPhone = 1;
		}
	});
}

function getVoteNum() {
	var url_num = "http://58.20.27.5/MemberInterface/getUserBetCount?activityId=35" +
		"&type=0&userId=" + mylib.user_id + "&usertoken=" + mylib.token +
		"&fromsource=" + mylib.fromsource;

	mylib.ContentLoader2(url_num, function(res) {
		common.log("url_num", url_num);
		//		common.log("res", JSON.stringify(res));
	});
}

function showMarq(marq_text) {
	$('.marquee_').show();
	$('#ulid>li>a').html(marq_text);
	new Marquee(["hottitle", "ulid"], 2, 2, 275, 20, 50, 0, 0);
}

var topIndex = 0;

var naviData = [];

var topTotal = naviData.length;

var curTime = "";

var child_aId = "";

function getNaviData() {
	var url_navi = "http://58.20.27.5/MemberInterface/GetActiveInfo?activityId=35" +
		"&type=0&userId=" + mylib.user_id + "&usertoken=" + mylib.token +
		"&fromsource=" + mylib.fromsource;

	mylib.ContentLoader2(url_navi, function(res) {
		common.log("url_navi", url_navi);
		//		common.log("res", JSON.stringify(res));
		if(res.Result == 0) {
			naviData = res.Data.children;
			curTime = res.time;
			if(type == 1) {
				/*imp*/
				curTime = "2018-06-15 12:22:34";
			}
			//				【description】B区赛事实况
			var marq_text = res.Data.description;
			if(!common.isNull(marq_text)) {
				showMarq(marq_text);
			}
			/*extend1 好彩直播的开关，0不显示，1显示*/
			if(!common.isNull(res.Data.extend1)) isColorLive = res.Data.extend1;
			showTopBtn();
			showNaviToday();
			//			showNaviList();
		}
	});
}

function showTopBtn() {
	if(isColorLive == 1) {
		btnLength = 5;
	} else {
		btnLength = 4;
	}
	for(var i = 0; i < btnLength; i++) {
		$('.btn>ul').append("<li class=\"btn_" + i + "\">" +
			"</li>");
	}
	$(".btn_0").html("每日竞猜");
	$(".btn_1").html("我的竞猜");
	$(".btn_2").html("活动规则");
	if(isColorLive == 1) {
		$(".btn_3").html("好彩直播");
		$(".btn_4").html("竞彩足球");
	} else {
		$(".btn_3").html("竞彩足球");
	}

	$(".btn_" + btn.curIdx).css({
		"background": "url()",
		"background-size": "133px 44px",
		"color": "#fdbe2e",
		"font-size": "28px"
	});
}

function getListData(data_id) {
	listData = [];
	listData.length = 0;
	var url_list = "http://58.20.27.5/MemberInterface/GetActiveInfoChild?activityId=" +
		data_id + "&type=0&userId=" + mylib.user_id + "&usertoken=" + mylib.token +
		"&fromsource=" + mylib.fromsource + "&queryMark=sjbjc";

	mylib.ContentLoader2(url_list, function(res) {
		common.log("url_list", url_list);
		//		common.log("res", JSON.stringify(res));
		if(res.Result == 0) {
			listData = res.Data.children2;
			showListData();
		}
	});
}

function showListData() {
	$('.showList').html("");
	$('.showList').html("<ul></ul>");
	/*if(type == 1) {
		for(var i = 0; i < 25; i++) {
			listData.push(listData[listData.length - 1]);
		}
	}*/
	loadData();
}

function CompareDate(d1, d2) {
	return((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
}

function loadData() {

	var tempData = [];

	var game_time = [];

	var promptType = -1;
	for(var i = 0; i < listData.length; i++) {
		var game_time_text = listData[i].images2;
		game_time.push(game_time_text);
		if(!common.isNull(listData[i].items)) {
			tempData.push(listData[i]);
		} else {
			/*【扩展字段1】 填8 表示1/8；填4表示1/4；填1表示半决赛；填0 表示决赛*/
			promptType = listData[i].extend1;
		}
	}

	if(!common.isNull(promptType) && promptType != -1) {
		var prompt_text = "";
		/*【扩展字段1】 填8 表示1/8；填4表示1/4；填1表示半决赛；填0 表示决赛*/
		if(promptType == 8) {
			prompt_text = "1/8决赛";
		} else if(promptType == 4) {
			prompt_text = "1/4决赛";
		} else if(promptType == 1) {
			prompt_text = "半决赛";
		} else if(promptType == 0) {
			prompt_text = "决赛";
		}
		prompt_text = prompt_text + "&nbsp;";
		prompt_text = prompt_text + naviData[navi.curIdx + topIndex].title + "&nbsp;";
		for(var k = 0; k < game_time.length; k++) {
			var temp_time = game_time[k];
			var s = temp_time.replace(/-/g, "/");
			var myDate = new Date(s);

			var temp_hour = myDate.getHours();
			if(temp_hour < 10) temp_hour = "0" + temp_hour;
			var temp_min = myDate.getMinutes();
			if(temp_min < 10) temp_min = "0" + temp_min;

			var temp_text = temp_hour + ":" + temp_min;

			prompt_text = prompt_text + temp_text + "和";

		}
		prompt_text = prompt_text.substring(0, prompt_text.length - 1) + "&nbsp;";
		prompt_text = prompt_text + "比赛队伍暂未揭晓";
		$("#prompt_text").html(prompt_text);
		$("#prompt_div").show();
		return;
	} else {
		$("#prompt_text").html("");
		$("#prompt_div").hide();
	}

	listData = tempData;

	if(common.isNull(listData)) {
		isKnown = 0;
		return;
	} else {
		isKnown = 1;
	}
	if(listData.length == 1) {
		$(".showList").css({
			"left": "300px"
		});
	} else {
		$(".showList").css({
			"left": "10px"
		});
	}
	for(var i = 0; i < listData.length; i++) {
		$('.showList>ul').append("<li class=\"list_" + i + "\">" +
			"<div class=\"bg\"><div class=\"left_tips\"></div>" +
			"<div class=\"center_tips\"></div>" +
			"<div class=\"right_logo\"></div>" +
			"<div class=\"vote_0\"></div>" +
			"<div class=\"vote_1\"></div>" +
			"<div class=\"vote_2\"></div>" +
			"<div class=\"score_0\"></div>" +
			"<div class=\"score_1\"></div>" +
			"<div class=\"img_0\"></div>" +
			"<div class=\"img_1\"></div>" +
			"<div class=\"name_0\"></div>" +
			"<div class=\"name_1\"></div>" +
			"</div></li>");
	}

	/*【images1】结果比分，如：3:2
【images2】比赛开始时间
【images3】比赛结束时间
【images4】竞猜开始时间
【images5】竞猜结束时间*/
	for(var i = 0; i < listData.length; i++) {
		if(type == 1) {
			if(common.isNull(listData[i].images1)) {
				listData[i].images1 = "3:2";
			}
			/*【images2】比赛开始时间*/
			if(common.isNull(listData[i].images2)) {
				listData[i].images2 = "2018-2-2 13:13:05";
				if(i == 1) listData[i].images2 = "2018-6-2 23:13:05";
				if(i == 2) listData[i].images2 = "2018-6-1 23:13:05";
			}
			/*【images3】比赛结束时间*/
			if(common.isNull(listData[i].images3)) {
				listData[i].images3 = "2018-6-6 13:13:05";
				if(i == 1) listData[i].images2 = "2018-6-2 23:13:05";
				if(i == 2) listData[i].images2 = "2018-6-1 23:13:05";
			}
			/*【images4】竞猜开始时间*/
			if(common.isNull(listData[i].images4)) {
				listData[i].images4 = "2018-1-2 13:13:05";
			}
			/*【images5】竞猜结束时间*/
			if(common.isNull(listData[i].images5)) {
				listData[i].images5 = "2018-1-2 13:13:05";
			}
		}
		/*拿当前系统时间，来比较，判断当前，显示的是那种状态state*/
		/*state 为0,竞猜未开启
		/*先判断是不是同一天*/
		var curDay = curTime.split(" ")[0];
		var matchDay = listData[i].images2.split(" ")[0];

		if(!CompareDate(curTime, listData[i].images2) && curDay != matchDay) {
			//			E部分比赛未开始且非当天比赛情况的，左上角显示“竞猜未开启”；中间显示“比赛开始时间”+“比赛队伍”
			listData[i].state = 0;
			listData[i].isOpen = false;
		} else {
			//			除比赛未开始且非当天比赛情况以外，E部分分为4个部分，其它情况如下图所示
			/*	1部分左上角图标，分为3种情况
				当天比赛未开始显示：本场截止时间：XX:XX，该时间显示比赛开始的北京时间；*/
			if(!CompareDate(curTime, listData[i].images2) && curDay == matchDay) {
				listData[i].state = 1;
				listData[i].isOpen = true;
			} else if(CompareDate(curTime, listData[i].images2) && !CompareDate(curTime, listData[i].images3)) {
				/*比赛正在进行中显示：正在比赛，*/
				listData[i].state = 2;
				/*比赛进行中，也不是不能投票的，和比赛已经结束时一样，
				 * 胜平胜按钮不能上焦点，整个方块可上焦点，用户点击无反应*/
				listData[i].isOpen = false;
			} else if(CompareDate(curTime, listData[i].images3)) {
				/*比赛已结束显示：比赛结束，*/
				/*  【extend5】 1:未猜中  2：猜中*/
				listData[i].state = 3;
				listData[i].isOpen = false;
			}
		}

		/*【title】：E区国家队名称
		【images1】：国家队头像
		【extend1】胜利填0；  平填1； 败填2；
		*/
		listData[i].isWin = 0;
		listData[i].selected = 0;

		for(var j = 0; j < listData[i].items.length; j++) {
			if(j == 0) {
				listData[i].leftId = listData[i].items[j].id;
				listData[i].leftName = listData[i].items[j].title;
				listData[i].leftImg = listData[i].items[j].images1;

				if(common.isNull(listData[i].items[j].extend4) && listData[i].selected == 0) {
					listData[i].selected = 0;
				} else {
					if(listData[i].items[j].extend4.indexOf(",") != -1) {
						listData[i].selected = 3;
					} else {
						listData[i].selected = 1;
					}
				}
				//				【extend1】胜利填0；  平填1； 败填2；
				if(listData[i].items[j].extend1 == 1 && listData[i].isWin == 0) {
					listData[i].isWin = 3;
				} else if(listData[i].items[j].extend1 == 0) {
					listData[i].isWin = 1;
				}

				listData[i].isGuess = listData[i].items[j].extend5;

			} else if(j == 1) {
				listData[i].rightId = listData[i].items[j].id;
				listData[i].rightName = listData[i].items[j].title;
				listData[i].rightImg = listData[i].items[j].images1;

				if(common.isNull(listData[i].items[j].extend4) && listData[i].selected == 0) {
					listData[i].selected = 0;
				} else {
					if(listData[i].items[j].extend4.indexOf(",") != -1) {
						listData[i].selected = 3;
					} else {
						listData[i].selected = 2;
					}
				}

				//				【extend1】胜利填0；  平填1； 败填2；
				if(listData[i].items[j].extend1 == 1 && listData[i].isWin == 0) {
					listData[i].isWin = 3;
				} else if(listData[i].items[j].extend1 == 0) {
					listData[i].isWin = 2;
				}

				if(common.isNull(listData[i].isGuess)) listData[i].isGuess = listData[i].items[j].extend5;
			}
		}

		$(".list_" + i + ">.bg>.name_0").html(listData[i].leftName);
		$(".list_" + i + ">.bg>.name_1").html(listData[i].rightName);

		$(".list_" + i + ">.bg>.img_0").css({
			"background": "url(" + listData[i].leftImg + ")",
			"background-size": "83px 55px"
		});

		$(".list_" + i + ">.bg>.img_1").css({
			"background": "url(" + listData[i].rightImg + ")",
			"background-size": "83px 55px"
		});
		if(listData[i].state == 0) {
			//			E部分比赛未开始且非当天比赛情况的，左上角显示“竞猜未开启”；中间显示“比赛开始时间”+“比赛队伍”
			$(".list_" + i + ">.bg").css({
				"background": "url(images/index/game_close.png)",
				"background-size": "563px 259px"
			});

			var center_time = listData[i].images2;
			var s = center_time.replace(/-/g, "/");
			var myDate = new Date(s);

			/*myDate.getMinutes(); //获取当前分钟数(0-59)
			myDate.getSeconds(); //获取当前秒数(0-59)*/

			var temp_month = myDate.getMonth() + 1;
			var temp_date = myDate.getDate();

			var temp_hour = myDate.getHours();
			if(temp_hour < 10) temp_hour = "0" + temp_hour;
			var temp_min = myDate.getMinutes();
			if(temp_min < 10) temp_min = "0" + temp_min;

			var temp_center = temp_month + "月" + temp_date + "日 " +
				temp_hour + ":" + temp_min;

			$(".list_" + i + ">.bg>.center_tips").html("比赛开始时间 : " + temp_center);

		} else if(listData[i].state == 1) {
			if(listData[i].selected == 1) {
				$(".list_" + i + ">.bg>.vote_0").css({
					"background": "url(images/index/lottery_chosen.png)",
					"background-size": "136px 62px"
				});
			} else if(listData[i].selected == 2) {
				$(".list_" + i + ">.bg>.vote_2").css({
					"background": "url(images/index/lottery_chosen.png)",
					"background-size": "136px 62px"
				});
			} else if(listData[i].selected == 3) {
				$(".list_" + i + ">.bg>.vote_1").css({
					"background": "url(images/index/tie_chosen.png)",
					"background-size": "136px 62px"
				});
			}
			//		当天比赛未开始显示：本场截止时间：XX:XX，该时间显示比赛开始的北京时间；
			$(".list_" + i + ">.bg").css({
				"background": "url(images/index/game.png)",
				"background-size": "563px 259px"
			});
			$(".list_" + i + ">.bg>.right_logo").css({
				"background": "url(images/index/close.png)",
				"background-size": "132px 23px"
			});
			var dead_text = "";

			var center_time = listData[i].images2;
			var s = center_time.replace(/-/g, "/");
			var myDate = new Date(s);

			var temp_hour = myDate.getHours();
			if(temp_hour < 10) temp_hour = "0" + temp_hour;
			var temp_min = myDate.getMinutes();
			if(temp_min < 10) temp_min = "0" + temp_min;

			var temp_center = temp_hour + ":" + temp_min;

			dead_text = "本场截止时间 : " + temp_center;
			$(".list_" + i + ">.bg>.left_tips").html(dead_text);
		} else if(listData[i].state == 2) {
			if(listData[i].selected == 1) {
				$(".list_" + i + ">.bg>.vote_0").css({
					"background": "url(images/index/lottery_chosen.png)",
					"background-size": "136px 62px"
				});
			} else if(listData[i].selected == 2) {
				$(".list_" + i + ">.bg>.vote_2").css({
					"background": "url(images/index/lottery_chosen.png)",
					"background-size": "136px 62px"
				});
			} else if(listData[i].selected == 3) {
				$(".list_" + i + ">.bg>.vote_1").css({
					"background": "url(images/index/tie_chosen.png)",
					"background-size": "136px 62px"
				});
			}
			$(".list_" + i + ">.bg").css({
				"background": "url(images/index/game.png)",
				"background-size": "563px 259px"
			});
			$(".list_" + i + ">.bg>.left_tips").html("正在比赛");

		} else if(listData[i].state == 3) {
			/*比赛已结束显示：比赛结束，*/
			/*  【extend5】 1:未猜中  2：猜中*/
			$(".list_" + i + ">.bg").css({
				"background": "url(images/index/game_over.png)",
				"background-size": "563px 259px"
			});

			if(listData[i].isWin == 1) {
				$(".list_" + i + ">.bg>.vote_0").css({
					"background": "url(images/index/lottery_success.png)",
					"background-size": "136px 62px"
				});
			} else if(listData[i].isWin == 2) {
				$(".list_" + i + ">.bg>.vote_2").css({
					"background": "url(images/index/lottery_success.png)",
					"background-size": "136px 62px"
				});
			} else if(listData[i].isWin == 3) {
				$(".list_" + i + ">.bg>.vote_1").css({
					"background": "url(images/index/tie_success.png)",
					"background-size": "136px 62px"
				});
			}
			var temp_score = listData[i].images1;
			if(!common.isNull(temp_score)) {
				temp_score.replace("：", ":");
				var temp_s_0 = temp_score.split(":")[0];
				var temp_s_1 = temp_score.split(":")[1];
				$(".list_" + i + ">.bg>.score_0").html(temp_s_0);
				$(".list_" + i + ">.bg>.score_1").html(temp_s_1);
			} else {
				$(".list_" + i + ">.bg>.score_0").html("?");
				$(".list_" + i + ">.bg>.score_1").html("?");
			}
			/*  isGuess 1:未猜中  2：猜中*/
			if(!common.isNull(listData[i].isGuess)) {
				if(listData[i].isGuess == 2) {
					$(".list_" + i + ">.bg>.right_logo").css({
						"background": "url(images/index/success.png)",
						"background-size": "132px 23px"
					});
				} else if(listData[i].isGuess == 1) {
					$(".list_" + i + ">.bg>.right_logo").css({
						"background": "url(images/index/lost.png)",
						"background-size": "132px 23px"
					});
				}
			} else {
				$(".list_" + i + ">.bg>.right_logo").css({
					"background": "url()",
					"background-size": "132px 23px"
				});
			}
		}
	}
}

function showNaviToday() {

	for(var i = 0; i < naviData.length; i++) {
		var temp_text = naviData[i].title;
		temp_text = common.U2A(temp_text);

		var s = curTime.replace(/-/g, "/");
		var myDate = new Date(s);

		var temp_month = myDate.getMonth() + 1;
		var temp_date = myDate.getDate();
		todayDate = temp_month + "月" + temp_date + "日";

		todayDate_1 = todayDate;
		todayDate_2 = todayDate;
		todayDate_3 = todayDate;

		if(temp_month < 10) {
			todayDate_1 = "0" + temp_month + "月" + temp_date + "日";
		}
		if(temp_date < 10) {
			todayDate_2 = temp_month + "月" + "0" + temp_date + "日";
		}
		if(temp_date < 10 && temp_month < 10) {
			todayDate_3 = "0" + temp_month + "月" + "0" + temp_date + "日";
		}

		if(todayDate == temp_text || todayDate_1 == temp_text || todayDate_2 == temp_text || todayDate_3 == temp_text) {
			todayidx = i;
		}
	}

	if(todayidx != -1) {
		if(todayidx < 3) {
			navi.curIdx = todayidx;
			topIndex = todayidx - navi.curIdx;
		} else if(todayidx < naviData.length - 3) {
			//			navi.curIdx = todayidx - 6;
			navi.curIdx = 3;
			topIndex = todayidx - navi.curIdx;
		} else {
			navi.curIdx = 6 - (naviData.length - 1 - todayidx);
			topIndex = todayidx - navi.curIdx;
		}
	}
	focus_manage.idx = navi.curIdx;
	showNaviList();
}

function showNaviList() {
	topTotal = naviData.length;
	for(var i = 0; i < 7; i++) {
		if(topIndex + i < topTotal) {
			var temp_text = naviData[i + topIndex].title;
			$(".navi_" + i + ">.date").html(temp_text);
			temp_text = common.U2A(temp_text);
			/*星期几，编辑配*/
			var temp_week = naviData[i + topIndex].extend1;

			/*var s = curTime.replace(/-/g, "/");
			var myDate = new Date(s);

			var temp_month = myDate.getMonth() + 1;
			var temp_date = myDate.getDate();
			var todayDate = temp_month + "月" + temp_date + "日";*/

			if(todayDate == temp_text || todayDate_1 == temp_text || todayDate_2 == temp_text || todayDate_3 == temp_text) {
				navi.curIdx = i;
				$(".navi_" + i + ">.week").html("");
				$(".navi_" + i + ">.week").css({
					"background": "url(images/index/today.png) no-repeat",
					"background-size": "156px 43px"
				});
			} else {
				$(".navi_" + i + ">.week").html(temp_week);
				$(".navi_" + i + ">.week").css({
					"background": "url() no-repeat",
					"background-size": "156px 43px"
				});
			}
		}
	}
	if(isFirstLoad == 0) {
		focus_manage.idx = navi.curIdx;
		eval(focus_manage.area + ".init()");
		child_aId = naviData[navi.curIdx + topIndex].id;
		getListData(child_aId);
		isFirstLoad = 1;
		$("#bgDiv").show();
		mylib.KEY_MOVE = true;
		$(".showList_show").show();
	}
	setNaviPage();
}

function setNaviPage() {
	if(topIndex > 0) {
		$("#pgUp").show();
	} else {
		$("#pgUp").hide();
	}
	if(topIndex + 7 < topTotal) {
		$("#pgDn").show();
	} else {
		$("#pgDn").hide();
	}
}
var btn = {
	curIdx: 0,
	lastIdx: 0,
	init: function() {
		focus_manage.btn = function(key_code) {
			btn.key_(key_code);
		};
		btn.isFocus();
	},
	key_: function(key_code) {
		switch(key_code) {
			case mylib.KEY_UP:
				//common.setShake(".btn_" + focus_manage.idx, "up");
				break;
			case mylib.KEY_DOWN:
				btn.lastFocus();
				focus_manage.area = "navi";
				btn.lastIdx = focus_manage.idx;
				focus_manage.idx = navi.lastIdx;
				navi.init();
				break;
			case mylib.KEY_RIGHT:
				if(focus_manage.idx < btnLength - 1) {
					btn.lastFocus();
					focus_manage.idx++;
					btn.setFocus();
				}
				break;
			case mylib.KEY_LEFT:
				if(focus_manage.idx > 0) {
					btn.lastFocus();
					focus_manage.idx--;
					btn.setFocus();
				}
				break;
			case mylib.KEY_SELECT:
				keyEnter();
				break;
			case mylib.KEY_PAGEDOWN:
				break;
			case mylib.KEY_PAGEUP:
				break;
			case mylib.KEY_BACK:
			case 27: //TODO  
			case 8:
				pageBack();
				break;
		}
	},
	setFocus: function() {
		setBg(".btn_" + focus_manage.idx,"images/index/btn_focus.png");
		/* $(".btn_" + focus_manage.idx).css({
			"background": "url(images/index/btn_focus.png) no-repeat",
			"background-size": "133px 44px",
			"color": "#ffffff",
			"font-size": "24px"
		}); */
	},
	lastFocus: function() {
		if(focus_manage.idx == btn.curIdx) {
			setBg(".btn_" + focus_manage.idx,"");
			/* $(".btn_" + focus_manage.idx).css({
				"background": "url()",
				"background-size": "133px 44px",
				"color": "#fdbe2e",
				"font-size": "28px"
			}); */
		} else {
			setBg(".btn_" + focus_manage.idx,"");
			/* $(".btn_" + focus_manage.idx).css({
				"background": "url()",
				"background-size": "133px 44px",
				"color": "#ffffff",
				"font-size": "24px"
			}); */
		}

	},
	isFocus: function() { //判断按钮状态
		btn.setFocus();
		//mylib.KEY_MOVE = true;
	},
	exit_url: function() {
		var exit_ = window.location.href.split("?")[0] + "?area=" + focus_manage.area +
			"&index=" + focus_manage.idx + "&activityId=" + aId + "&video_idx=" + video_idx;
		return escape(exit_);
	}
}

var naviMoveSize = 80;
var moveId = 1;
var naviShowNum = 6;
/*导航区A区滑动效果*/

/*function naviMoveTop() {
	var topVal = $(".naviList").css("top");
	topVal = parseInt(topVal);
	$(".naviList").css("top", (topVal - naviMoveSize * moveId) + "px");
}

function naviMoveDown() {
	var topVal = $(".naviList").css("top");
	topVal = parseInt(topVal);
	$(".naviList").css("top", (topVal + naviMoveSize * moveId) + "px");
}*/

var navi = {
	/*switch*/
	curIdx: 0,
	lastIdx: 0,
	init: function() {
		focus_manage.navi = function(key_code) {
			navi.key_(key_code);
		};
		navi.isFocus();
	},
	key_: function(key_code) {
		clearTimeout(timer);
		switch(key_code) {
			case mylib.KEY_UP:
				//common.setShake(".btn_" + focus_manage.idx, "up");
				//				navi.lastFocus();
				$(".navi_" + focus_manage.idx + ">.date").css({
					"background": "url(images/index/navi_cur.png)",
					"background-size": "145px 49px"
				});
				focus_manage.area = "btn";
				navi.lastIdx = focus_manage.idx;
				focus_manage.idx = btn.lastIdx;
				btn.init();
				break;
			case mylib.KEY_DOWN:
				if(listData.length != 0 && isKnown == 1) {
					$(".navi_" + focus_manage.idx + ">.date").css({
						"background": "url(images/index/navi_cur.png)",
						"background-size": "145px 49px"
					});
					focus_manage.area = "list";
					navi.lastIdx = focus_manage.idx;
					focus_manage.idx = 0;
					if(listData[focus_manage.idx].isOpen) {
						list.btnIdx = 0;
					} else {
						list.btnIdx = 3;
					}
					list.lineIdx = 0;
					list.init();
				}
				break;
			case mylib.KEY_RIGHT:

				navi.lastFocus();
				if(focus_manage.idx + topIndex < topTotal - 1) {
					if(focus_manage.idx < 3) {
						focus_manage.idx++;
					} else if(focus_manage.idx == 3) {
						if(topIndex + 7 < topTotal) {
							topIndex++;
							showNaviList();
						} else {
							focus_manage.idx = 4
						}
					} else if(focus_manage.idx < 6) {
						focus_manage.idx++;
					} else if(focus_manage.idx == 6) {
						if(topIndex + 7 < topTotal) {
							topIndex++;
							showNaviList();
						}
					}
				}
				navi.setFocus();
				isKnown = 0;
				timer = setTimeout(function() {
					keyEnter();
				}, 500);
				break;
			case mylib.KEY_LEFT:
				navi.lastFocus();
				if(focus_manage.idx > 3) {
					focus_manage.idx--;
				} else if(focus_manage.idx == 3) {
					if(topIndex > 0) {
						topIndex--;
						showNaviList();
					} else {
						focus_manage.idx = 2;
					}
				} else if(focus_manage.idx > 0) {
					focus_manage.idx--;
				} else if(focus_manage.idx == 0) {
					if(topIndex > 0) {
						topIndex--;
						showNaviList();
					}
				}
				navi.setFocus();
				isKnown = 0;
				timer = setTimeout(function() {
					keyEnter();
				}, 500);
				break;
			case mylib.KEY_SELECT:
				keyEnter();
				break;
			case mylib.KEY_PAGEDOWN:
				break;
			case mylib.KEY_PAGEUP:
				break;
			case mylib.KEY_BACK:
			case 27: //TODO  
			case 8:

				if(focus_manage.idx + topIndex == todayidx || todayidx == -1) {
					pageBack();
				} else {
					navi.lastFocus();
					showNaviToday();
					navi.setFocus();
					isKnown = 0;
					keyEnter();
				}

				break;
		}
	},

	setFocus: function() {
		setBg(".navi_" + focus_manage.idx + ">.date","images/index/navi_focus.png");
		/* $(".navi_" + focus_manage.idx + ">.date").css({
			"background": "url(images/index/navi_focus.png)",
			"background-size": "145px 49px"
		}); */
	},
	lastFocus: function() {
		setBg(".navi_" + focus_manage.idx + ">.date","");
		/* $(".navi_" + focus_manage.idx + ">.date").css({
			"background": "url()",
			"background-size": "145px 49px"
		}); */
	},
	isFocus: function() { //判断按钮状态
		navi.setFocus();
		//mylib.KEY_MOVE = true;
	},
	exit_url: function() {
		var exit_ = window.location.href.split("?")[0] + "?area=" + focus_manage.area +
			"&index=" + focus_manage.idx + "&activityId=" + aId + "&video_idx=" + video_idx;
		return escape(exit_);
	}
}

var list = {
	curPage: 0,
	num: 12,
	leng: 0,
	total: 0,
	totRow: 0,
	curRow: 0,
	lastIdx: 0,
	lineIdx: 0,
	btnIdx: 0,
	init: function() {
		focus_manage.list = function(key_code) {
			list.key_(key_code);
		};
		list.isFocus();
	},
	key_: function(key_code) {
		switch(key_code) {
			case mylib.KEY_UP:
				var tmpIdx = focus_manage.idx - 2;
				if(list.lineIdx > 0) {
					list.lastFocus();
					list.lineIdx--;
					focus_manage.idx = focus_manage.idx - 2;
					if(listData[tmpIdx].isOpen) {
						if(list.btnIdx == 3) list.btnIdx = 0;
					} else {
						list.btnIdx = 3;
					}
					list.setFocus();
				} else {
					list.lastFocus();
					focus_manage.area = "navi";
					focus_manage.idx = navi.lastIdx;
					navi.setFocus();
				}
				break;
			case mylib.KEY_DOWN:
				var tmpIdx = focus_manage.idx + 2;
				if(isId(tmpIdx)) {
					list.lastFocus();
					list.lineIdx++;
					focus_manage.idx = focus_manage.idx + 2;
					if(listData[tmpIdx].isOpen) {
						if(list.btnIdx == 3) list.btnIdx = 0;
					} else {
						list.btnIdx = 3;
					}
					list.setFocus();
				}
				break;
			case mylib.KEY_RIGHT:
				list.lastFocus();
				if(list.btnIdx == 0 || list.btnIdx == 1) {
					list.btnIdx++;
				} else {
					var tmpIdx = focus_manage.idx + 1;
					if(focus_manage.idx % 2 == 0 && isId(tmpIdx)) {
						focus_manage.idx++;
						if(listData[tmpIdx].isOpen) {
							list.btnIdx = 0;
						} else {
							list.btnIdx = 3;
						}
					}
				}
				list.setFocus();
				break;
			case mylib.KEY_LEFT:
				list.lastFocus();
				if(list.btnIdx == 1 || list.btnIdx == 2) {
					list.btnIdx--;
				} else {
					if(focus_manage.idx % 2 == 1) {
						var tmpIdx = focus_manage.idx - 1;
						focus_manage.idx--;
						if(listData[tmpIdx].isOpen) {
							list.btnIdx = 2;
						} else {
							list.btnIdx = 3;
						}
					}
				}
				list.setFocus();
				break;
			case mylib.KEY_SELECT:
				keyEnter();
				break;
			case mylib.KEY_PAGEDOWN:
				break;
			case mylib.KEY_PAGEUP:
				break;
			case mylib.KEY_BACK:
			case 27: //TODO  
			case 8:

				//pageBack();
				list.lastFocus();
				focus_manage.area = "navi";
				focus_manage.idx = navi.curIdx;
				list.lineIdx = 0;
				list.lastIdx = 0;
				list.getSlide();
				navi.setFocus();
				break;
		}
	},
	getSlide: function() {
		$(".showList").css({
			"top": (10 - list.lineIdx * 274) + "px"
		});
	},
	setFocus: function() {
		/*background: url(../images/index/game_over.png);*/
		if(list.btnIdx == 3) {
			$(".list_" + focus_manage.idx).css({
				"background": "url(images/index/lottery_div.png) no-repeat",
				"background-size": "563px 259px"
			});
		} else if(list.btnIdx == 0) {
			if(listData[focus_manage.idx].selected == 1) {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/lottery_chosen_focus.png) no-repeat",
					"background-size": "136px 62px"
				});
			} else {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/lottery_focus.png) no-repeat",
					"background-size": "136px 62px"
				});
			}
		} else if(list.btnIdx == 2) {
			if(listData[focus_manage.idx].selected == 2) {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/lottery_chosen_focus.png) no-repeat",
					"background-size": "136px 62px"
				});
			} else {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/lottery_focus.png) no-repeat",
					"background-size": "136px 62px"
				});
			}
		} else if(list.btnIdx == 1) {
			if(listData[focus_manage.idx].selected == 3) {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/tie_chosen_focus.png) no-repeat",
					"background-size": "136px 62px"
				});
			} else {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/tie_focus.png) no-repeat",
					"background-size": "136px 62px"
				});
			}
		}
		list.getSlide();
	},
	lastFocus: function() {
		if(list.btnIdx == 3) {
			$(".list_" + focus_manage.idx).css({
				"background": "url()",
				"background-size": "563px 259px"
			});
		} else if(list.btnIdx == 0) {
			if(listData[focus_manage.idx].selected == 1) {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/lottery_chosen.png) no-repeat",
					"background-size": "136px 62px"
				});
			} else {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url()",
					"background-size": "136px 62px"
				});
			}
		} else if(list.btnIdx == 2) {
			if(listData[focus_manage.idx].selected == 2) {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/lottery_chosen.png) no-repeat",
					"background-size": "136px 62px"
				});
			} else {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url()",
					"background-size": "136px 62px"
				});
			}
		} else if(list.btnIdx == 1) {
			if(listData[focus_manage.idx].selected == 3) {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url(images/index/tie_chosen.png) no-repeat",
					"background-size": "136px 62px"
				});
			} else {
				$(".list_" + focus_manage.idx + ">.bg>.vote_" + list.btnIdx).css({
					"background": "url()",
					"background-size": "136px 62px"
				});
			}
		}
	},
	pageUp: function() {
		if(focus_manage.idx % list.num < (list.num / 2)) {
			list.curPage--;
			$('.page_idx').html(list.curPage + 1);
		}
		pageFlip();
		//	$('#pgDn').css("background","url(images/down.png)");
		var tmp = list.curRow * (-300);
		$('.showList').animate({
			top: tmp + "px"
		}, 100);
		//alert($('#list').css('top')+'index:'+index+'list.curRow:'+list.curRow);
		/*setTimeout(function(){
			$('#pgUp').css("background","url(images/list/up.png)");
		},300);*/
	},
	pageDown: function() {
		if(focus_manage.idx % list.num > (list.num / 2 - 1) && index % list.num < list.num) {
			list.curPage++;
			$('.page_idx').html(list.curPage + 1);
		}
		//alert('list.totRow:'+list.totRow);
		if(list.curRow + 1 < list.totRow - 1) {
			list.curRow++;
		}
		pageFlip();
		var tmp = list.curRow * (-300);
		$('.showList').animate({
			top: tmp + "px"
		}, 100);
		//alert($('#list').css('top')+'index:'+index+'list.curRow：'+list.curRow);
	},
	isFocus: function() { //判断按钮状态
		list.setFocus();
		//	mylib.KEY_MOVE = true;
	},
	exit_url: function() {
		var exit_ = window.location.href.split("?")[0] + "?area=" + focus_manage.area +
			"&index=" + focus_manage.idx + "&activityId=" + aId + "&video_idx=" + video_idx;
		return escape(exit_);
	}
}

function transform_(id, num, type, size) {
	$(id).css({
		"position": "relative",
		"z-index": 24 + type,
		"-ms-transform": "scale(" + num + ")",
		"-moz-transform": "scale(" + num + ")",
		"-o-transform": "scale(" + num + ")",
		"-webkit-transform": "scale(" + num + ")",
		"transform": "scale(" + num + ")",
		"border": "" + size + "px solid #ece0ff"
	});
}

function setChosenBtn(bIdx, listIdx, isChosen, phoneType) {
	/*background: url(../images/index/game_over.png);*/
	isPhone = phoneType;
	if(bIdx == 0) {
		if(isChosen == 1 || listData[listIdx].selected == 1) {
			$(".list_" + listIdx + ">.bg>.vote_" + bIdx).css({
				"background": "url(images/index/lottery_chosen_focus.png) no-repeat",
				"background-size": "136px 62px"
			});
			listData[listIdx].selected = 1;
		} else {
			$(".list_" + listIdx + ">.bg>.vote_" + bIdx).css({
				"background": "url(images/index/lottery_focus.png) no-repeat",
				"background-size": "136px 62px"
			});
		}
	} else if(bIdx == 2) {
		if(isChosen == 2 || listData[listIdx].selected == 2) {
			$(".list_" + listIdx + ">.bg>.vote_" + bIdx).css({
				"background": "url(images/index/lottery_chosen_focus.png) no-repeat",
				"background-size": "136px 62px"
			});
			listData[listIdx].selected = 2;
		} else {
			$(".list_" + listIdx + ">.bg>.vote_" + bIdx).css({
				"background": "url(images/index/lottery_focus.png) no-repeat",
				"background-size": "136px 62px"
			});
		}

	} else if(bIdx == 1) {
		if(isChosen == 3 || listData[listIdx].selected == 3) {
			$(".list_" + listIdx + ">.bg>.vote_" + bIdx).css({
				"background": "url(images/index/tie_chosen_focus.png) no-repeat",
				"background-size": "136px 62px"
			});
			listData[listIdx].selected = 3;
		} else {
			$(".list_" + listIdx + ">.bg>.vote_" + bIdx).css({
				"background": "url(images/index/tie_focus.png) no-repeat",
				"background-size": "136px 62px"
			});
		}
	}
}
/*按确定*/
function keyEnter() {
	if(focus_manage.area == "list") {
		if(list.btnIdx < 3) {
			var tmp_url = "";
			var bg_img = "";
			var template_str = "";
			list.lastFocus();
			if(isPhone == 0) {
				tmp_url = "sub_tel.html";
			} else {
				tmp_url = "pop.html";
			}
			if(tmp_url.indexOf("?") != -1) {
				tmp_url += "&";
			} else {
				tmp_url += "?";
			}
			var toBack = window.location.href.split("?")[0] +
				"?index=" + focus_manage.idx +
				"&activityId=" + aId +
				"&area=" + focus_manage.area;
			tmp_url += "exitStr=" + escape(toBack);
			if(listData[focus_manage.idx].selected == 0) {
				/*没选过去，去确认页面*/
				template_str = "confirm";
				bg_img = "images/pop/bg_2.png";
			} else {
				/*选过了，提示已选*/
				/*已选择的话，template_str传timeout*/
				template_str = "timeout";
				bg_img = "images/pop/bg_4.png";
			}

			/*当前比赛，未投票，并且有投票的时候，出现弹窗再次确认的弹窗*/
			var temp_itemid = ""; //itemid 用户猜的球队id
			var temp_noitemid = ""; //noitemid 用户未猜的球队id
			var temp_itemname = ""; //itemname 用户猜的球队名称
			var temp_noitemname = ""; //noitemname 用户未猜的球队名称
			var temp_Mark = 0 //选择平局则传1，选择的哪个国家队则传0
			var temp_aId = 0; //这里传每次比赛的id
			temp_aId = listData[focus_manage.idx].id;
			if(list.btnIdx == 1) {
				temp_itemid = listData[focus_manage.idx].leftId;
				temp_itemname = listData[focus_manage.idx].leftName;
				temp_itemname = common.U2A(temp_itemname);

				temp_noitemid = listData[focus_manage.idx].rightId;
				temp_noitemname = listData[focus_manage.idx].rightName;
				temp_noitemname = common.U2A(temp_noitemname);
				temp_Mark = 1;
			} else if(list.btnIdx == 0) {
				temp_itemid = listData[focus_manage.idx].leftId;
				temp_itemname = listData[focus_manage.idx].leftName;
				temp_itemname = common.U2A(temp_itemname);

				temp_noitemid = listData[focus_manage.idx].rightId;
				temp_noitemname = listData[focus_manage.idx].rightName;
				temp_noitemname = common.U2A(temp_noitemname);
				temp_Mark = 0;
			} else if(list.btnIdx == 2) {
				temp_itemid = listData[focus_manage.idx].rightId;
				temp_itemname = listData[focus_manage.idx].rightName;
				temp_itemname = common.U2A(temp_itemname);

				temp_noitemid = listData[focus_manage.idx].leftId;
				temp_noitemname = listData[focus_manage.idx].leftName;
				temp_noitemname = common.U2A(temp_noitemname);
				temp_Mark = 0;
			}

			set_jump(
				tmp_url, {
					"jump": "iframe",
					"exit_url": "about:blank",
					"exit_area": focus_manage.area,
					"exit_idx": focus_manage.idx,
					"btn_idx": list.btnIdx,
					"template": template_str,
					"aId": child_aId,
					"isChosen": 0,
					"game_id": temp_aId,
					"bg_img": bg_img, //弹窗背景图
					"itemid": temp_itemid,
					"noitemid": temp_noitemid,
					"itemname": temp_itemname,
					"noitemname": temp_noitemname,
					"mark": temp_Mark,
					"isPhone": isPhone
				}
			)
		}
	} else if(focus_manage.area == "poster") {} else if(focus_manage.area == "video") {} else if(focus_manage.area == "navi") {
		child_aId = naviData[focus_manage.idx + topIndex].id;
		navi.curIdx = focus_manage.idx;
		getListData(child_aId);
	} else if(focus_manage.area == "btn") {
		var jumpIdx = parseInt(focus_manage.idx);
		var url_ = "";
		switch(jumpIdx) {
			case 0:
				/*每日竞猜*/
				url_ = "index.html";
				jumpWeb(url_);
				break;
			case 1:
				/*我的竞猜*/
				url_ = "guess.html";
				jumpWeb(url_);
				break;
			case 2:
				/*活动规则*/
				url_ = "rules.html";
				jumpWeb(url_);
				break;
			case 3:
				if(isColorLive == 1) {
					/*好彩直播*/
					var channel_id = "";
					var channel_name = "";
					/*	channel_id.replace("，", ",");
						if(channel_id.indexOf(",") != -1) {
							if(mylib.app_version.toUpperCase().indexOf("HW") != -1) {
								channel_id = channel_id.split(",")[1];
							} else if(mylib.app_version.toUpperCase().indexOf("ZTE") != -1) {
								channel_id = channel_id.split(",")[0];
							} else {
								channel_id = channel_id.split(",")[0];
							}
						}
						channel_name = common.U2A(channel_name);*/
					mylib.livePlayVideo(channel_id, channel_name);
				} else {
					/*竞彩足球*/
					url_ = "list.html";
					jumpWeb(url_);
				}
				break;
			case 4:
				/*竞彩足球*/
				url_ = "list.html";
				jumpWeb(url_);
				break;
			default:
				break;
		}
	}
	/*$(".btn_0").html("每日竞猜");
	$(".btn_1").html("我的竞猜");
	$(".btn_2").html("活动规则");
	if(isColorLive == 1) {
		$(".btn_3").html("好彩直播");
		$(".btn_4").html("竞彩足球");
	}*/
}

function get_pop_msg() {
	return pop_msg;
}
//设置跳转
function set_jump(url, opt) {
	if(opt.jump == "iframe") {
		pop_msg = opt;
		common.open(url);
	}
}

function isId(idx) {
	var tmp = $('.list_' + idx).html();
	if(tmp == "" || tmp == null || tmp == undefined) {
		return false;
	} else {
		return true;
	}
}

function jumpWeb(url_) {
	window.location.href = url_;
}
//返回
function pageBack() {
	common.goback(c_name_index);
}