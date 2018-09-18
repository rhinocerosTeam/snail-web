/**
 * @Author: 周岩
 * @Date: 2018-8-14
 * @Last Modified time: 2018-8-14
 * @Description: 举报接口
 * @Query:
 * @Props:
 * @Remark:
 */

import {
    API_HOST,
    CENTERAPI_HOST
} from '../config';

export default {

    /** 提交举报 **/
    getReportData(data) {
        return this.axios(CENTERAPI_HOST + "/h5api/mixgw/v1/report", data)
    },

}