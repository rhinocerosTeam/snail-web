/**
 * Created by user on 2018/8/7.
 * author suzhe
 * describe 排行榜接口
 */

import {CLUBAPI_HOST} from '../config';

export default {
    /*
     * 排行榜期数列表
     * */
    weekNumList(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/weekNumList")
    },
    /*
     * 排行榜月数列表(月榜)
     * */
    monthNumList(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/monthNumList", data)
    },
    /*
     * 排行榜页面上一期前三名数
     * */
    rankingPrevTop3weekData(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/rankingPrevTop3Data", data)
    },
    /*
     * 排行榜页面上一期前三名数(月榜)
     * */
    rankingPrevTop3monthData(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/rankingPrevTop3MonthData", data)
    },
    /*
     * 星光榜
     * */
    starweekRanking(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/starRanking", data)
    },
    /*
     * 星光榜(月榜)
     * */
    starmonthRanking(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/starMonthRanking", data)
    },
    /*
     * 后援会榜
     * */
    fanClubweekRanking(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/fanClubRanking", data)
    },

    /*
     * 后援会榜(月榜)
     * */
    fanClubmonthRanking(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/fanClubMonthRanking", data)
    },

    /*
     * 粉丝榜
     * */
    userFansweekRanking(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/userFansRanking", data)
    },

    /*
     * 粉丝榜(月榜)
     * */
    userFansmonthRanking(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/userFansMonthRanking", data)
    },

    //本周贡献榜
    userForStarRanking(data) {
        return this.axios(CLUBAPI_HOST + "/v1/h5/userForStarRanking", data)
    },
}

