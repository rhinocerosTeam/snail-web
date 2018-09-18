/**
 * Created by Cray on 2017/1/5.
 */
import {API_HOST, PAY_HOST, CLUBAPI_HOST, CENTERAPI_HOST} from './config';
import _ from 'lodash'
//import Log from 'utils/log';
import Local from '@utils/local';
import axios from './axios'
import qs from "qs";

import homeApi from './home';   // 首页接口
import jquery from '@js/lib/jquery'
export default _.merge({},
    homeApi,
    {
        API_HOST,
        PAY_HOST,
        CLUBAPI_HOST,
        CENTERAPI_HOST, // 盒饭LIVE PC 官网接口
        /*安卓下载地址*/
        downLoadAndroid(){
            return this.axios( API_HOST + "/vsr/getApkDownloadUrl");
        },
        getServerTime(data) {
            return this.axios(API_HOST + "/v1/h5/getSystemTime", data);
        },
        /**
         * 解析结果
         * @param data
         * @returns {*}
         */
        parse(data){
            "use strict";
            let result = null;
            // Log.log(data);
            if (data) {
                if (data["code"] == "1000" || data["code"] == "200") {
                    result = data["data"];
                    if (data["data"] == undefined || data["data"] == null) {
                        result = {};
                    }

                } else if (data["code"] == "4202") {
                    if (!window.location.href.includes('login')) {
                        window.location.href = './login.html'
                    }
                } else {
                    console.warn('api_parse', data["msg"]);
                }
                console.log()

                return result;
            }
        },

        paramFormat(data = {}) {
            let result = {},
                token = this.token,
                consume = this.consume || '',
                time = new Date().getTime()

            /*0 app内部进入 1 外部浏览进入*/
            Object.assign(result, {
                token,
                consume,
                time,
                data: JSON.stringify(data),
                uatype: 1
            })
           // result.msg = Utils.md5(result.token + "_hefanlive_" + result.data)
            return result;
        },

        axios(url, data = {}, {
            method = 'get',
            headers = {},
            timeout = 15000
        } = {}) {
            data = this.paramFormat(data)
            let params = method == 'get' ? {params: data} : {data: qs.stringify(data, {arrayFormat: 'brackets'})}
            return axios({
                method,
                url,
                headers,
                timeout,
                ...params,
            })
        },
    },
    {
        get token() {
            return Local.getItem('token');
        },
        get consume() {
            return Local.getItem('userId');
        },
        set token(value) {
            Local.setItem('token', value);
        }
    }
)

{


}

