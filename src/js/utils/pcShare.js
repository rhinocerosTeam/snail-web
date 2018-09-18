/**
 * Created by user on 2018/8/9.
 */

export default {
    //分享到新浪
    shareSina(data){
        let {title, shortUrl, picurl} = data
        return 'http://v.t.sina.com.cn/share/share.php?title=' + title + '&url=' + shortUrl + '&content=utf-8&sourceUrl=' + shortUrl + '&pic=' + picurl;
    },

    //分享到qq空间
    shareQz(data){
        let {title, shortUrl, picurl} = data
        return 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary=' + title + '&url=' + shortUrl + '&pics=' + picurl;
    },

    //分享到qq
    shareQq(data){
        let {title, shortUrl, picurl, desc} = data
        return 'https://connect.qq.com/widget/shareqq/index.html?url=' + shortUrl + '&title=' + title + '&desc=' + desc + '&summary=&pics=' + picurl;
    }
}