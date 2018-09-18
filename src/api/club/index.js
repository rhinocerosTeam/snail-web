
import {
    API_HOST,
    CENTERAPI_HOST
} from '../config';

export default {

    /** 个人中心  图集数据 **/
    getListAnchorClubPhotos(data) {
        return this.axios(CENTERAPI_HOST + "/pcapi/mixgw/v1/listAnchorClubPhotos", data)
    },
    /**
     * 个人主页个人信息
     * */
    getUserDetail(data){
        // return this.axios("https://api.hefantv.com/v1/h5/listAnchorClubIndex", data)
        return this.axios(CENTERAPI_HOST +"/pcapi/mixgw/v1/listAnchorClubIndex", data)
    },
    /**
     * 个人主页关于他
     * */
    getPersonal(data){
        return this.axios(CENTERAPI_HOST +"/pcapi/mixgw/v1/personal", data)
    },
    /**
     * 个人主页动态、资讯、视频
     * */
    getDynamicList(data){
        return this.axios(CENTERAPI_HOST +"/pcapi/mixgw/v1/dynamicList", data)
    },


    /** 个人主页  获取他关注的列表 */
    getListWatchAnchorInfo(data){
        return this.axios(CENTERAPI_HOST +"/pcapi/mixgw/v1/listWatchAnchorInfo", data)
    },

    /** 个人主页  获取他粉丝列表 */
    getListFansInfo(data){
        return this.axios(CENTERAPI_HOST +"/pcapi/mixgw/v1/listFansInfo", data)
    },

    /** 个人主页  关注操作 */
    getFork(data){
        return this.axios(CENTERAPI_HOST +"/h5api/mixgw/v1/fork", data)
    },

    /** 个人主页  取消关注操作 */
    getUnFork(data){
        return this.axios(CENTERAPI_HOST +"/h5api/mixgw/v1/unfork", data)
    },
}









