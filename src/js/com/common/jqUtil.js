/**
 * Created by songpeilan on 2016/12/12.
 */

import Constant from '@common/constant';
import api from 'api';


$(function () {
    Constant.isIe9 = checkIsIe9();
    init()
    addAction_header();
    AddAction_href();

    // downLoadAndroid(); 下载安卓 App 路径

})

function init() {
    if(window.location.pathname.indexOf('index.html') == -1){
        $(window).scroll(debounce(function () {
            let scrollTop = $(window).scrollTop()
            // $(".header").css('background', `rgba(255,255,255,${Math.abs(scrollTop/100)})`)
            if (scrollTop == 0) {
                $(".header").css('background', 'transparent')
            }else {
                $(".header").css('background', '#fff')
            }
        }, 100, 300))
    }


    function debounce(fn, delay, mustRunDelay) {
        var timer = null;
        var t_start;
        var context = this;

        return function () {
            var args = arguments;
            var t_curr = +new Date();
            clearTimeout(timer);
            if (!t_start) {
                t_start = t_curr;
            }
            if (t_curr - t_start >= mustRunDelay) {
                fn.apply(context, args);
                t_start = t_curr
            } else {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        }
    }
}


function downLoadAndroid() {
    /** 请求安卓APK下载路径 */
    api.downLoadAndroid().done((res) => {
        var data = res;
        $(".androidA").attr('href', data.data);
    });
}


function AddAction_href() {
    /**
     * 账号充值
     * */
    $(".recharge").bind("click", function () {
        window.location = "payrecharge.html";
    });

    /**
     * 首页
     * */
    $("#head,.homeMenu").bind("click", function () {
        if (Constant.isIe9) {
            window.location = "staticIndex.html";
        } else {
            window.location = "index.html";
        }

    });

    /**
     * 关于我们
     * */
    $(".abortUsMenu").bind("click", function () {
        window.location = "aboutUs.html";

    });


    /**
     * 跳转到隐私政策
     * */
    $("#person_text").bind("click", function () {
        window.location = "privateItem.html";
    });

    /**
     * 跳转到服务协议
     * */
    $("#service_text").bind("click", function () {
        window.location = "service_text.html";
    });

    /**
     * 跳转到联系我们
     * */
    $("#contact_text").bind("click", function () {
        window.location = "aboutUs.html?pageType=contactUs";
    });

    /**
     * 12318全国文化市场举报平台
     * */
    $(".reportButton").bind("click", function () {
        window.open("http://jb.ccm.gov.cn/");
    });


    /**
     * 互联网文化经营单位
     */
    $(".licenseButton").bind("click", function () {
        window.open("http://sq.ccm.gov.cn:80/ccnt/sczr/service/business/emark/toDetail/ae903fe564af4b649a106a0b832fe3d1");
    });


}


function addAction_header() {
    $(".weChatIcon").mouseover(function () {
        $(".weChatDialog").show();
    });
    $(".weChatIcon").mouseout(function () {
        $(".weChatDialog").hide();
    });
    $(".weBlogIcon").mouseover(function () {
        $(".weboDialog").show();
    });
    $(".weBlogIcon").mouseout(function () {
        $(".weboDialog").hide();
    });

}


function checkIsIe9() {
    var browser = navigator.appName
    if (browser == "Microsoft Internet Explorer") {
        var b_version = navigator.appVersion
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
            return true;
        }
    }
    return false;
}