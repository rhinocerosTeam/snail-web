/**
 * Created by VULCAN on 2018/8/8.
 */
import axios from 'axios'
import statusCode from './code'
//import localUserInfo from '@js/com/common/localUserInfo'

axios.interceptors.request.use(config => {
    return config
}, error => {
    //localUserInfo.pageShowMsg('请求超时')
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {

    // 对响应数据做点什么
    let res = response.data,
        data = null
    switch (response.data.code) {
        case statusCode.SUCCESS:
            data = res.data
            break
        case statusCode.UNSUCCES:
        case statusCode.UnknownException:
        case statusCode.RturnNullException:
        case statusCode.ParamException:
            //localUserInfo.pageShowMsg(res.msg)
            return Promise.reject(res)
            break
        default:
            break
    }
    return res
}, err => {
    // 对响应错误做点什么
   /* switch (err.response.status) {
        case 404:
            localUserInfo.pageShowMsg(err.response.statusText)
            break
        default:
            break
    }*/
    return Promise.reject(err)
})

export default axios
