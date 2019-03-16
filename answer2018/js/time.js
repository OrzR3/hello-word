var focus_manage = {};
var parea = mylib.get_request_params("area");
var index = mylib.get_request_params("index");
var type = mylib.get_request_params("type"); //1:调试
var exitStr = mylib.get_request_params("exitStr");
var aId = mylib.get_request_params("activityId");
common.isNull(parea) ? parea = "btn" : parea = parea;
common.isNull(index) ? index = 2 : index = parseInt(index);
common.isNull(aId) ? aId = 35 : aId = parseInt(aId);
var c_name_index = "answer_time";
var type = mylib.get_request_params("type");
common.isNull(type) ? type = 0 : type = parseInt(type);
if(type == 1) {
	mylib.user_id = "073108478526A@tv";
	mylib.token = "DHSnXw9e7i_seEXt1ODiQ_M135392310";
	mylib.app_version = "YYS.5.0.0.Y28.0.HNLT.0.0_Pre_Release";
	mylib.device_mac = "cc-79-cf-01-5e-2e";
	mylib.token = "ZgOOgo5MjkyOTIdLS5mZBTuqS7R8BXxLtKoNhwUFSwYFO3sOdgZ2h6oGDg4OtLQ7qiC0jkyOTI5MZgOOgg%3D%3D";
}

var currentTime = "";
var systemTime = new Date().getTime();
var strDay = "";
var showTimer = -1;
var timeCount = 0;

$(function() {
	main();
	common.addExitUrl(exitStr, c_name_index);
	focus_manage.area = parea;
	focus_manage.idx = index;
	mylib.bind_key(focus_manage);
	btn.init();
});
var btn = {
	init: function() {
		focus_manage.btn = function(key_code) {
			btn.key_(key_code);
		};
		btn.isFocus();
	},
	key_: function(key_code) {
		switch(key_code) {
			case mylib.KEY_UP:
				break;
			case mylib.KEY_DOWN:
				break;
			case mylib.KEY_RIGHT:
				break;
			case mylib.KEY_LEFT:
				break;
			case mylib.KEY_SELECT:
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
	setFocus: function() {},
	lastFocus: function() {},
	isFocus: function() { //判断按钮状态
		btn.setFocus();
		//mylib.KEY_MOVE = true;
	},
	exit_url: function() {
		var exit_ = window.location.href.split("?")[0] + "?area=" + focus_manage.area +
			"&index=" + focus_manage.idx + "&activity id=" + aId;
		return escape(exit_);
	}
}

function jumpWeb(url_) {
	window.location.href = url_;
}
//返回
function pageBack() {
	common.goback(c_name_index);
}

var CHANCE_SPEC, x, y;

CHANCE_SPEC = 60;
x = 0;
y = 0;

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1) - min);
}

function drawSpec(data, x, y, w) {
	var index;

	index = (x + y * w) * 4;

	data.data[index + 0] = 0;
	data.data[index + 1] = 0;
	data.data[index + 2] = 0;
	data.data[index + 3] = 30;
}

function drawPattern(canvas, ctx, data) {
	var w, h;
	w = canvas.width;
	h = canvas.height;
	while(x < w) {
		if(rand(1, 100) < CHANCE_SPEC) {
			drawSpec(data, x, y, w);
		}
		x++;
	}
	if(x === w) {
		x = 0;
		y++;
	}
	if(y === h) {
		ctx.putImageData(data, 0, 0);
		return;
	}
	drawPattern(canvas, ctx, data);
}

function main() {
	drawDiv("main");
	var canvas, ctx, data;
	currentTime = new Date();
	console.log('starting1');
	canvas = document.getElementById('my-canvas');
	ctx = canvas.getContext('2d');
	data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	drawPattern(canvas, ctx, data);
	
	strDay = "2018-11-19 23:14:04";
	timer();
	//	updateTime();
	showTime(strDay);
}

function drawDiv(id) {
	var str = "<canvas id=\"my-canvas\"></canvas>" +
		"<div id=\"clock\">" +
		"<div class=\"time-container  hours\">" +
		"<div class=\"digit\">" +
		"<div class=\"fade\">&nbsp;</div>" +
		"<span class=\"num top\" id=\"hour-tens-top\"></span>" +
		"<span class=\"num bottom\" id=\"hour-tens-bottom\">" +
		"<div class=\"bottom-container\"></div></span>" +
		"<div class=\"swapper\">" +
		"<div id=\"top-hour-tens-anim\" class=\"num-anim  top-anim\" style=\"display:none;\">" +
		"<div class=\"top-half-num\"></div>" +
		"</div>" +
		"<div id=\"bottom-hour-tens-anim\" class=\"num-anim  bottom-anim\" style=\"display:none;\">" +
		"<div class=\"bottom-half-num\">" +
		"<div class=\"dropper\"></div></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"ring ring-left\"></div>" +
		"<div class=\"ring ring-right\"></div>" +
		"</div>" +
		"<div class=\"digit\">" +
		"<div class=\"fade\">&nbsp;</div>" +
		"<span class=\"num top\" id=\"hour-ones-top\"></span>" +
		"<span class=\"num bottom\" id=\"hour-ones-bottom\">" +
		"<div class=\"bottom-container\"></div></span>" +
		"<div class=\"swapper\">" +
		"<div id=\"top-hour-ones-anim\" class=\"num-anim top-anim\" style=\"display:none;\">" +
		"<div class=\"top-half-num\"></div>" +
		"</div>" +
		"<div id=\"bottom-hour-ones-anim\" class=\"num-anim bottom-anim\" style=\"display:none;\">" +
		"<div class=\"bottom-half-num\">" +
		"<div class=\"dropper\"></div></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"ring ring-left\"></div>" +
		"<div class=\"ring ring-right\"></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"time-container minutes\">" +
		"<div class=\"digit\">" +
		"<div class=\"fade\">&nbsp;</div>" +
		"<span class=\"num top\" id=\"minute-tens-top\"></span>" +
		"<span class=\"num bottom\" id=\"minute-tens-bottom\">" +
		"<div class=\"bottom-container\"></div></span>" +
		"<div class=\"swapper\">" +
		"<div id=\"top-minute-tens-anim\" class=\"num-anim top-anim\" style=\"display:none;\">" +
		"<div class=\"top-half-num\"></div>" +
		"</div>" +
		"<div id=\"bottom-minute-tens-anim\" class=\"num-anim bottom-anim\" style=\"display:none;\">" +
		"<div class=\"bottom-half-num\">" +
		"<div class=\"dropper\"></div></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"ring ring-left\"></div>" +
		"<div class=\"ring ring-right\"></div>" +
		"</div>" +
		"<div class=\"digit\">" +
		"<div class=\"fade\">&nbsp;</div>" +
		"<span class=\"num top\" id=\"minute-ones-top\"></span>" +
		"<span class=\"num bottom\" id=\"minute-ones-bottom\">" +
		"<div class=\"bottom-container\"></div></span>" +
		"<div class=\"swapper\">" +
		"<div id=\"top-minute-ones-anim\" class=\"num-anim top-anim\" style=\"display:none;\">" +
		"<div class=\"top-half-num\"></div>" +
		"</div>" +
		"<div id=\"bottom-minute-ones-anim\" class=\"num-anim bottom-anim\" style=\"display:none;\">" +
		"<div class=\"bottom-half-num\">" +
		"<div class=\"dropper\"></div></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"ring ring-left\"></div>" +
		"<div class=\"ring ring-right\"></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"time-container seconds\">" +
		"<div class=\"digit\">" +
		"<div class=\"fade\">&nbsp;</div>" +
		"<span class=\"num top\" id=\"second-tens-top\"></span>" +
		"<span class=\"num bottom\" id=\"second-tens-bottom\">" +
		"<div class=\"bottom-container\"></div></span>" +
		"<div class=\"swapper\">" +
		"<div id=\"top-second-tens-anim\" class=\"num-anim top-anim\"  style=\"display:none;\">" +
		"<div class=\"top-half-num\"></div>" +
		"</div>" +
		"<div id=\"bottom-second-tens-anim\" class=\"num-anim bottom-anim\"  style=\"display:none;\">" +
		"<div class=\"bottom-half-num\">" +
		"<div class=\"dropper\"></div></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"ring ring-left\"></div>" +
		"<div class=\"ring ring-right\"></div>" +
		"</div>" +
		"<div class=\"digit\">" +
		"<div class=\"fade\">&nbsp;</div>" +
		"<span class=\"num top\" id=\"second-ones-top\"></span>" +
		"<span class=\"num bottom\" id=\"second-ones-bottom\">" +
		"<div class=\"bottom-container\"></div></span>" +
		"<div class=\"swapper\">" +
		"<div id=\"top-second-ones-anim\" class=\"num-anim top-anim\"  style=\"display:none;\">" +
		"<div class=\"top-half-num\"></div>" +
		"</div>" +
		"<div id=\"bottom-second-ones-anim\" class=\"num-anim bottom-anim\"  style=\"display:none;\">" +
		"<div class=\"bottom-half-num\">" +
		"<div class=\"dropper\"></div></div>" +
		"</div>" +
		"</div>" +
		"<div class=\"ring ring-left\"></div>" +
		"<div class=\"ring ring-right\"></div>" +
		"</div>" +
		"</div>" +
		"</div>";
	$(id).html(str);
}

function updateTime() {
	var seconds,  minutes,  hours, times, i;
	//	currentTime = new Date();
	currentTime = new Date(currentTime - 1000);
	times = {
		'second': currentTime.getSeconds(),
		'minute': currentTime.getminutes(),
		'hour': currentTime.gethours()
	};
	for(type in times) {
		if(times.hasOwnProperty(type)) {
			setTimes(type, timeToString(times[type]));
		}
	}
	setTimeout(updateTime, 1000);
}
/*倒计时*/
function showTime(time) {
	var timeObject = getDateDiff(time, getCurrTime());
	common.log("timeObject :", timeObject.hour + "|" + timeObject.min + "|" + timeObject.second);
	if(timeObject.timeover) {
		//倒计时结束后触发事件

	} else {
		clearTimeout(showTimer);
		var seconds,  minutes,  hours, times, i;
		times = {
			'second': timeObject.second,
			'minute': timeObject.min,
			'hour': timeObject.hour
		};
		common.log(JSON.stringify(times));
		for(type in times) {
			if(times.hasOwnProperty(type)) {
				setTimes(type, timeToString(times[type]));
			}
		}
		showTimer = setTimeout(function() {
			showTime(time)
		}, 1000);
	}
}

function timer() {
	timeCount++;
	setTimeout(timer, 1000);
}

function getCurrTime() {
	var d = new Date(systemTime + 1000 * timeCount);
	return d;
}

/*date.js里的方法*/
function getDateDiff(endTime, nowTime) {
	//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
	endTime = endTime.replace(/\-/g, "/");
	var eTime = new Date(endTime); //结束时间
	//  var nowTime = new Date();
	var total = (eTime.getTime() - nowTime.getTime()) / 1000;
	/*imp*/
	var hour = addZero(parseInt(total / (60 * 60)) + "", 2); //计算整数小时数
	var afterHour = total - hour * 60 * 60; //取得算出小时数后剩余的秒数
	var min = addZero(parseInt(afterHour / 60) + "", 2); //计算整数分
	var second = addZero(parseInt(total - hour * 60 * 60 - min * 60) + "", 2); //取得算出分后剩余的秒数
	return {
		"timeover": total <= 0 ? true : false,
		"hour": hour,
		"min": min,
		"second": second
	};
}

//一般用于时间为个位数时补零
function addZero(str, num) {
	str = str.toString();
	for(var i = str.length; i < num; i++) {
		str = '0' + str;
	}
	return str;
}

function timeToString(currentTime) {
	var t;
	t = currentTime.toString();
	if(t.length === 1) {
		return '0' + t;
	}
	return t;
}

function getPreviousTime(type) {
	return $('#' + type + '-top').text();
}

function setTimes(type, timeStr) {
	setTime(getPreviousTime(type + '-tens'),
		timeStr[0], type + '-tens');
	setTime(getPreviousTime(type + '-ones'),
		timeStr[1], type + '-ones');
}

function setTime(previousTime, newTime, type) {
	if(previousTime === newTime) {
		return;
	}
	setTimeout(function() {
		$('#' + type + '-top').text(newTime);
	}, 150);
	setTimeout(function() {
		$('.bottom-container',
			$('#' + type + '-bottom')).text(newTime);
	}, 365);
	animateTime(previousTime, newTime, type);
}

function animateTime(previousTime, newTime, type) {
	var top, bottom;
	top = $('#top-' + type + '-anim');
	bottom = $('#bottom-' + type + '-anim');
	$('.top-half-num', top).text(previousTime);
	$('.dropper', bottom).text(newTime);
	top.show();
	bottom.show();
	$('#top-' + type + '-anim').css('visibility', 'visible');
	$('#bottom-' + type + '-anim').css('visibility', 'visible');
	animateNumSwap(type);
	setTimeout(function() {
		hideNumSwap(type);
	}, 365);
}

function animateNumSwap(type) {
	$('#top-' + type + '-anim').toggleClass('up');
	$('#bottom-' + type + '-anim').toggleClass('down');
}

function hideNumSwap(type) {
	$('#top-' + type + '-anim').toggleClass('up');
	$('#bottom-' + type + '-anim').toggleClass('down');
	$('#top-' + type + '-anim').css('visibility', 'hidden');
	$('#bottom-' + type + '-anim').css('visibility', 'hidden');
}

/*$(document).ready(main);

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		}
})();*/