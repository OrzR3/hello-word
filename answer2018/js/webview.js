/**
 * webview接口
 */
/*global Common: true, $: false,jQuery:false,template:false,console:false , starcorExt:false,starcor:false*/

(function(){
var oldStarcorExt = starcorExt;
starcorExt = {
	_setCallbackResult: function(idx,ret) {
		oldStarcorExt._setCallbackResult(idx,ret);
	},
	_execAndroidFunc: function(func,args) {
	return	oldStarcorExt._execAndroidFunc(func,args);
	}
};
//
starcorExt._invokeCallback = function(name, args, returnIdx) {
    var func = this._callbacks[name];
	console.log("starcorExt._invokeCallback func:"+func+"args:"+args);
	if(args!=null){
		 var item0 = args[0];
		 console.log("item0.type:"+typeof(item0.type));
		 if(typeof(item0.type)=="undefined"){
			 args=JSON.parse(args);
			 console.log("args:"+args);
		 }
	}
    var ret = null;
    try {
        var invokeArgs = [];
        for( var idx in args ) {
            var item = args[idx];
			console.log("item:"+item+"idx:"+idx);
			console.log("item.type:"+item.type+",item.value:"+item.value);
            switch(item.type) {
                case "number":
                    invokeArgs.push(Number(item.value));
                    break;
                case "string":
                    invokeArgs.push(String(item.value));
                    break;
                case "boolean":
                    invokeArgs.push("true".toLowerCase() == item.value);
                    break;
            }
        }
        ret = func.apply(this, invokeArgs);
    } catch (e) {}
    starcorExt._setCallbackResult(returnIdx, ret);
};
starcorExt._addCallback = function(callback) {
    var callbackIdx = String(starcorExt._callback_counter++);
    this._callbacks[callbackIdx] = callback;
    return callbackIdx;
};
starcorExt._callback_counter = 0;
starcorExt._callbacks = {};

// 调用浏览器功能，参数依cmd类型而定
starcorExt.exec = function() {
    var args = [];
    for(var idx=0;idx<arguments.length;++idx) {
        var val = arguments[idx];
        switch (typeof val) {
            case "number":
                args.push({"type":"number", "value":val});
                break;
            case "string":
                args.push({"type":"string", "value":val});
                break;
            case "bool":
                args.push({"type":"boolean", "value":val});
                break;
            case "object":
                args.push({"type":"object", "value":val});
                break;
            case "function":
                args.push({"type": "callback", "value": this._addCallback(val)});
                break;
        }
    }
    var cmd = args.shift();
    if(typeof this._execAndroidFunc === "undefined"){
        return null;
    }
    return this._execAndroidFunc(cmd.value, JSON.stringify(args));
};
// 返回版本信息
starcorExt.getVersion = function() {
    return this.exec("getVersion");
};
// 关闭浏览器或浏览器所在的页面
starcorExt.closeBrwoser = function(reason) {
    if (reason)
        return this.exec("closeBrowser",reason);
};
// 输出日志信息, info可为一个或多个, 多个输入参数以空格分隔
starcorExt.log = function(tag, info) {
    var logMsg = [];
    for(var idx=1;idx<arguments.length;++idx) {
        var item = arguments[idx];
        if (item instanceof Array || typeof(item) == "object") {
            logMsg.push(JSON.stringfy(item));
        } else {
            logMsg.push(item);
        }
    }
    this.exec("log", tag, logMsg.join(" "));
};
// 调整浏览器尺寸，调整后，浏览器保持在屏幕上居中位置
starcorExt.resizeBrowser = function(width, height) {
    return this.exec("resizeBrowser", width, height);
};
starcorExt.moveBrowser = function(x, y) {
    return this.exec("moveBrowser", x, y);
};
starcorExt.moveBrowserEx = function(x, y, width, height) {
    return this.exec("moveBrowserEx", x, y, width, height);
};
starcorExt.getBrowserPosition = function() {
    var posInfo = this.exec("getBrowserPosition");
    posInfo = posInfo.split(",");
    return {
        x:posInfo[0],
        y:posInfo[1],
        width:posInfo[2],
        height:posInfo[3]
    };
};
starcorExt.getScreenSize = function() {
    var posInfo = this.exec("getScreenSize");
    posInfo = posInfo.split(",");
    return {
        width:posInfo[0],
        height:posInfo[1]
    };
};
// 设置事件回调
// handlerType 回调类型, KeyEvent, Message
// handler 回调函数, 其形式由handlerType决定
//-----------------------------------------------------------------------------
// handler为空表示取消对事件的监听
// handler如果处理了事件, 返回true, 否则事件交由浏览器处理
starcorExt.setHandler = function(handlerType, handler) {
    return this.exec("setHandler", handlerType, handler);
};
// 获取焦点
// webview获取焦点后，所有按键事件都将转发给页面处理
starcorExt.requestFocus = function() {
    return this.exec("requestFocus");
};
// 释放焦点
// direction: 将焦点释放给当前webview在某个方向上的相邻元素，如无相邻元素，则焦点不变化
starcorExt.releaseFocus = function(direction) {
    return this.exec("releaseFocus", direction);
};
// 是否有焦点
starcorExt.hasFocus = function() {
    return this.exec("hasFocus");
};
// 读取系统属性
// propName:
//		user.name			读取用户名，未登录时值为空
//		user.token			读取用户token，未登录时值为空
//		user.id				读取用户id，未登录时值为空
//		app.name			读取应用名
//		app.version			读取应用版本
//		stbid               stb_id机顶盒编码，即机顶盒串号(联通)
starcorExt.readSystemProp = function(propName) {
    return String(this.exec("readSystemProp", propName));
};
// 设置按键事件回调, handler形如function(action, keyCode, keyName, metaState)
// action可以为keyUp, keyDown
// keyName为按键名称, 如: up, down, left, right, a, b, c, d, 1, 2, 3, 4, enter, return, UNKNOWN
// keyCode为按键对应的键值
// metaState为控制建对应状态，ctrl, alt, shift等
starcorExt.setKeyEventHandler = function(handler) {
    return this.setHandler("KeyEvent", handler);
};
// 设置消息回调，handler形如function(msg, extInfo)
// msg:
//		onFocusChanged,	true/false	-	webview焦点变化，true表示获取焦点，false表示失去焦点
starcorExt.setMessageHandler = function(handler) {
    return this.setHandler("Message", handler);
};
// 发送消息给应用
// msg:
//      onLogin,     extInfo: {name:"user name", id:"user id", token:"login token"}
//      onPurchases, extInfo: {id:"item id", result:"success"/"failed", msg:"err message"}
starcorExt.sendMessage = function(msg, extInfo) {
    return this.exec("sendMessage", msg, extInfo);
};
// 发送Android Intent
// mode:
//      sendBroadcast   发送广播
//      startActivity   打开应用
//      startService    启动服务
starcorExt.sendIntent = function(mode, intent) {
    return this.exec("sendIntent", mode,intent);
};
// 打开子浏览器（弹出方式）
// 同时只能打开一个子浏览器
starcorExt.openBrowser = function(url) {
    return this.exec("openBrowser", url);
};



/*设置小视频窗口位置
x:起始x坐标
y:起始y坐标
width:宽度
height:高度
*/
starcorExt.setVideoWindowPosition = function(x,y,width,height) {
    return this.exec("setVideoWindowPosition", x,y,width,height);
};
/*播放视频，其中playParams为json数据,示例如下：
var playParams = {
            video_type:"0",
            video_id:"b836aef6c9b851958199d3b5a1a77050",
            video_name:"青云志",
            media_asset_id:"TVseries",
            category_id:"1000015",
            ui_style:"0",
            video_index:"26",
            quality:"hd",
            video_all_index:"27",
            video_new_index:"26",
        };
*/
starcorExt.playVideo = function(playParams) {
    return this.exec("playVideo", playParams);
};
//停止播放视频
starcorExt.stopVideo = function() {
    return this.exec("stopVideo");
};
//web页面是否有输入框，有输入框则设置为“true”,没有则设置成“false”
//调用示例:Webview.setInputTypeTextFlag("false");
starcorExt.setInputTypeTextFlag = function(flag) {
    return this.exec("setInputTypeTextFlag",flag);
};
 window.Webview = starcorExt;

})();
