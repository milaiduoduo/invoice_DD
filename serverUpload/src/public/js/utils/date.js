// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
// Date.prototype.Format = function (fmt) { //author: meizz   
//   var o = {
//     "M+": this.getMonth() + 1, //月份   
//     "d+": this.getDate(), //日   
//     "h+": this.getHours(), //小时   
//     "m+": this.getMinutes(), //分   
//     "s+": this.getSeconds(), //秒   
//     "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
//     "S": this.getMilliseconds() //毫秒   
//   };
//   if (/(y+)/.test(fmt))
//     fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//   for (var k in o)
//     if (new RegExp("(" + k + ")").test(fmt))
//       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//   return fmt;
// }

Date.prototype.timestamp = function () {
    function add0(m) {
        return m < 10 ? `0${m}` : m;
    }

    function add00(m) {
        return m < 100 ? `00${m}` : m;
    }
    var time = new Date();
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var ms = time.getMilliseconds();
    return `${y}${add0(m)}${add0(d)}${add0(h)}${add0(mm)}${add0(s)}${add00(ms)}`;
};

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}