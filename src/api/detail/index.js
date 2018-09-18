/**
 * Created by chy on 2018/8/7.
 */

import {CENTERAPI_HOST} from '../config';

export default {
    /**
     * 综艺详情
     * */
    getVarietyDetail(data){
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/varietyDetail", data)
    },

    /**
     * 评论
     * */
    getComments(data){
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/getComments", data)
    },
    /**
     * 评论点赞
     * */
    commentsAdmire(data){
        return this.axios(CENTERAPI_HOST + "/h5api/mixgw/v1/commentsAdmire", data)
    },
    /**
     * 获取动态，帖子，资讯详情
     * */
    getDynamicDetail(data){
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/getMessage", data)
    },

    /**
     * pc官网用户关注操作
     * */
    fork(data){
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/fork", data)
    },
    /**
     * pc官网取消关注
     * */
    unfork(data){
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/unfork", data)
    },
    /**
     * 获取关注状态
     * */
    getForkStatus(data){
        return this.axios(CENTERAPI_HOST + "/h5api/mixgw/v1/forkStatus", data)
    }


}