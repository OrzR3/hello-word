(function () {
    var common = {};
    //返回参数
    common.location_url = function (url, parameter) {
        var exit = window.location.href.split("?")[0] +
            "?" + parameter;
        var exit_data = common.getcookie("exit");
        if (!common.isNull(exit_data)) {
            exit = exit_data + "#" + exit;
        }
        document.cookie = "exit=" + exit;
        window.location.href = url
    };
    common.exit = function () {
        var exit = common.getcookie("exit");
        var current_url = window.location.href;
        var exit_array = new Array();
        var tem;
        //如果为空返回首页
        var c_start = document.cookie.indexOf("exit=");
        if (c_start == -1) {
            Webview.closeBrwoser("返回");
        } else {
            //字符串转数组
            exit_array = exit.split("#");
            var exit_url = exit_array.pop();
            //获取主机地址之后的目录如：/Tmall/index.jsp 
            var pathName = window.document.location.pathname;
            Webview.log("返回", exit_url + "·········" + pathName);
            if (exit_url.indexOf(pathName) != -1) { //去重复
                Webview.closeBrwoser("返回");
            } else {
                window.location.href = exit_url;
            }
        }
        document.cookie = "exit=" + exit_array.join("#"); //数组转字符串
    };
    //获取cookie参数
    common.getcookie = function (c_name) {
        if (document.cookie.length > 0) {
            var c_end = 0;
            c_start = document.cookie.indexOf(c_name + "="); //这里因为传进来的的参数就是带引号的字符串，所以c_name可以不用加引号
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start); //当indexOf()带2个参数时，第二个代表其实位置，参数是数字，这个数字可以加引号也可以不加（最好还是别加吧）
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }

    //删除cookie
    common.delCookie = function (c_name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = common.getcookie(c_name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
    common.addExitUrl = function (url_, c_name) {
        if (common.isNull(document.referrer)) { //上页为空清空Cookie
            common.clearAllCookie();
            return false;
        }
        if (!common.isNull(url_)) {
            var exit_url = unescape(url_); //转义
            if (document.cookie.indexOf(c_name) != -1) { //已有用数组方式储存
                var exit_array = common.getcookie(c_name).split("|-|");
                exit_array.push(url_);
                document.cookie = c_name + "=" + exit_array.join("|-|");
            } else {
                document.cookie = c_name + "=" + exit_url;
            }
            common.log("@addExitUrl-add", url_);
        }
    }
    //清除所有cookie函数  
    common.clearAllCookie = function () {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
    common.goback = function (c_name) {
        if (document.cookie.indexOf(c_name) == -1 || common.isNull(document.referrer)) { //回首页
            Webview.closeBrwoser("返回");
        } else {
            Webview.stopVideo();
            if (common.isNull(common.getcookie(c_name))) { //cookie 为空返回
                Webview.closeBrwoser("返回");
                return true;
            }
            var exit_array = common.getcookie(c_name).split("|-|");
            var exit_url = exit_array.pop();
            common.log("@goback", exit_url);
            window.location.href = exit_url;
            if (exit_array.length > 0) {
                document.cookie = c_name + "=" + exit_array.join("|-|");
            }
        }
    }
    common.U2A = function (str) {
        var code = str.match(/&#(\d+);/g);
        if (code) {
            for (var i = 0, leng = code.length; i < leng; i++) {
                str = str.replace(code[i], String.fromCharCode(code[i].replace(/[&#;]/g, "")))
            }
        }
        return str;
    };
    common.isNull = function (str) {
        /*alert("1"+typeof(str));*/
        //		console.log("2"+str);
        switch (typeof (str)) {
            case "string":
                return str == "undefined" || str == "" || str == "null" || str == "NaN" || str.length == 0;
                break;
            case "object":
                return str == null || str.length == 0 || str == "";
                break;
            case "number":
                var type = false;
                if (isNaN(str)) {
                    if (str >= 0 || str <= 0) {
                        type = false;
                    } else {
                        type = true;
                    }
                }
                return type;
                break;
            case "undefined":
                return str == undefined;
                break;
            default:
                return false;
                break;
        }
    }

    //去空格 is_global "g" 去除全部
    common.trim = function (str, is_global) {
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (is_global.toLowerCase() == "g") {
            result = result.replace(/\s/g, "");
        }
        return result;
    }

    //电信 海报替换成联通海报
    /**
     * img 需替换的图片
     * ip 替换的ip(如120.77.85.17)，可不填，默认为（120.77.85.17）
     **/
    common.unicom_poster = function (img, ip) {
        var pattern =
            /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/;
        if (common.isNull(ip)) {
            ip = "120.77.85.17";
        }
        return img.replace(pattern, ip);
        //return "images/default.png";
    }

    /*
     *获取文字长度
     * font_size 字体大小如24
     * str 字符串
     */
    common.visualLength = function (font_size, str) {
        if (common.isNull($("#ruler"))) {
            $('body').append("<span id=\"ruler\" style=\"font-size:" + font_size + "px;\"></span>");
        }
        var ruler = $("#ruler");
        ruler.html(str + "&nbsp;&nbsp;");
        return ruler.width();
    }
    /*
     * 加载动画
     * type:1结束动画加载
     */
    common.loading = function (type) {
        var degree = 0; //初始角度
        var loadImg = document.getElementById('loadImg');
        if (type != 1 && !loadImg) {
            $('body').append(
                "<img id=\"loadImg\" src=\"images/loading.png\" style=\"position: absolute;top:338px;left: 668px;z-index:9999;\">"
            );
            loadImg = document.getElementById('loadImg');
            load();
        } else if (type == 1) {
            $('#loadImg').remove();
        }

        function load() {
            degree = degree + 180 * Math.PI / 180;

            $('#loadImg').css({
                "-webkit-transform": "rotate(" + degree + "deg)",
                "-ms-transform": "rotate(" + degree + "deg)",
                "-moz-transform": "rotate(" + degree + "deg)",
                "-o-transform": "rotate(" + degree + "deg)",
                "transform": "rotate(" + degree + "deg)"
            });
            setTimeout(function () {
                load();
            }, 20);
        }

    }

    /*
     * 动画
     * type left up
     */
    common.setShake = function (id, type) {
        var shake = $(id).attr("class");
        if (!common.isNull(shake)) {
            if (shake.indexOf("shake_left_105") != -1) {
                $(id).removeClass("shake_left_105");
            }
            if (shake.indexOf("shake_up") != -1) {
                $(id).removeClass("shake_up");
            }
            if (shake.indexOf("shake_left") != -1) {
                $(id).removeClass("shake_left");
            }
            if (shake.indexOf("shake_left_no") != -1) {
                $(id).removeClass("shake_left_no");
            }
        }
        setTimeout(function () {
            $(id).addClass("shake_" + type);
        }, 1);
    }
    //打印
    common.put = function (res) {
        $('body').append(
            "<div id=\"test_\" style=\"z-index:9999;position: absolute;width:680px;left:20px;color:#FF34B3;font-size:18px;\"></>"
        );
        $('#test_').html($('#test_').html() + "<br/>" + res);
    }
    //打印
    common.log = function (name, msg) {
        try {
            Webview.log(name, msg);
        } catch (e) {
            console.log(name + ":" + msg);
        }
    }
    common.open = function (url) {
        /*var str = "<iframe src=\"#\"  id=\"iframe_1000\" name=\"iframe_1000\" width=\"1280px\" height=\"720px\" frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" allowtransparency=\"yes\"  style=\"position: absolute;left:0px;top:0px;z-index: 1000;\"></iframe>";
        $("body").append(str);*/
        iframe_1000.location.href = url;
    }
    common.iframe_load = function (id, url) {
        var str = "<iframe src=\"" + url +
            "\" class=\"radius\" id=\"iframe_crousel\" name=\"iframe_crousel\" width=\"100%\" height=\"100%\"";
        str +=
            "frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" allowtransparency=\"yes\">";
        str += "</iframe>";
        $(id).append(str);

    }
    //gif图加前缀
    common.add_gif = function (img_url) {
        var pathname = "http://10.255.0.219/poster/";
        if (img_url.indexOf(".gif") != -1 || img_url.indexOf(".GIF") != -1) {
            return pathname + img_url;
        } else {
            return img_url;
        }
    }
   
    window.common = common;
})();
