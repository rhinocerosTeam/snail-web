
export default {

    getUrlRequest(){
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if (str.indexOf("&") != -1) {
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                }
            } else {
                var key = str.substring(0,str.indexOf("="));
                var value = str.substr(str.indexOf("=")+1);
                theRequest[key] = decodeURI(value);
            }
        }
        return theRequest;
    }

}













