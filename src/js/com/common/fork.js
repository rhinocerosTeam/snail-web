/*
 * @Author: 宋佩兰
 * @Date: 2018-08-14
 * @LastEditors:
 * @LastEditTime:2018-08-14
 * @Description: 关注/取消关注明星
 */

import api from 'api'
import localUserInfo from '@common/localUserInfo'
import STATUS_CODE from 'api/code'
export default {
    /*是不是自己*/
    isSelf(starId){

        let webUserInfo = localUserInfo.getLocalUserInfoAll()

        if (!starId || !webUserInfo || starId != webUserInfo.userId) {
            return false
        }

        return true
    },
    /**
     * 关注
     * @param {number} starId 明星id
     * */
    async fork(starId){
        let data = this.getConfig(starId)
        if (!data) {
            return null
        }
        let res = await api.fork({...data}).catch((err) => {
            console.log(err)
        })

        let d = api.parse(res)
        if (res && res.code == STATUS_CODE.SUCCESS) {
            localUserInfo.pageShowMsg('关注成功')
            return {follow: d}
        }else{
            if(res&&res.msg){
                localUserInfo.pageShowMsg(res.msg)
            }

        }

        return null
    },
    /**
     * 取消关注
     * @param {number} starId 明星id
     * */
    async unfork(starId){
        let data = this.getConfig(starId)
        if (!data) {
            return false
        }
        let res = await api.unfork({...data, starCoinCheck: 1}).catch((err) => {
            console.log(err)
        })

        api.parse(res)
        if (res && res.code == STATUS_CODE.SUCCESS) {
            localUserInfo.pageShowMsg('取消关注成功')
            return true
        }
        return false
    },
    /**
     * 封装数据
     * @param {number} starId 明星id
     * */
    getConfig(starId){
        let webUserInfo = localUserInfo.getIsLogin()

        if (!webUserInfo) {
            return null
        }

        return {
            consume: webUserInfo.userId,
            token: webUserInfo.token,
            userId: webUserInfo.userId,
            mainUserId: starId
        }
    }
}