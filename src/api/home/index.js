/**
 * @Author: 周岩
 * @Date: 2018-8-7
 * @Last Modified time: 2018-8-20
 * @Description: 首页 数据接口
 * @Query:
 * @Props:
 * @Remark:
 */

import {
    API_HOST,
    CENTERAPI_HOST
} from '../config';

export default {

    /** 首页banner + 综艺 + 文章 **/
    getIndexData(data) {
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/tips", data)
    },

    /** 首页 未登录状态 ( 明星动态 ) 数据接口 */
    getStarMessageList(data) {
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/starMessageList", data)
    },

    /** 首页 登录状态 关注的 ==> 动态数据 **/
    getMessageList(data) {
        return this.axios(CENTERAPI_HOST + "/h5api/mixgw/v1/messageList", data)
    },

    /** 获取用户 星币数据 **/
    getStarCoinList(data) {
        return this.axios(CENTERAPI_HOST + "/h5api/mixgw/v1/getStarCoinInfo", data)
    },

    /** 请求 我关注的 明星头像列表数据 */
    getFindWatchStarList(data) {
        return this.axios(CENTERAPI_HOST + "/h5api/mixgw/v1/findWatchStarList", data)
    },
    /** pc官网获取分享短链接 */
    getShortUrl(data) {
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/getShortUrl", data)
    },
    /** pc官网动态/综艺点赞 */
    admire(data) {
        return this.axios(CENTERAPI_HOST + "/h5api/mixgw/v1/admire", data)
    },
    /** pc官网动态/综艺点赞 */
    getNewsList(data) {
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/fullArticleList", data)
    },


    /** 请求安卓APK下载路径 */
    /*downLoadAndroid(){
        return $.ajax({url: API_HOST + "/vsr/getApkDownloadUrl", type:'GET', dataType: 'json',data:this.paramFormat()});
        //return this.axios(API_HOST + "/vsr/getApkDownloadUrl")
    },*/
}