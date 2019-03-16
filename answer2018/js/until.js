function setBg(id, str) {
    var width = $(id).width();
    var height = $(id).height();
    $(id).css({
        "background": "url(" + str + ")",
        "background-size": width + "px " + height + "px"
    })
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
        "border": "" + size + "px solid #fff"
    });
}

function isId(idx) {
    var tmp = $('.list_' + idx).html();
    if (tmp == "" || tmp == null || tmp == undefined) {
        return false;
    } else {
        return true;
    }
}
