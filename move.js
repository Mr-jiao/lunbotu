function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, false)[attr];
    }
}
function startMove(obj, json, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;
        var iSpeed,
            iCur;
        for (var attr in json) {
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (attr == 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (bStop) {
                clearInterval(obj.timer);
                typeof callback == 'function' ? callback() : '';
            }
        }
    }, 30)
}