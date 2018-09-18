/*
 * @Author: 徐长剑 
 * @Description: vuex 定义插件文件
 * @Date: 2018-08-27 13:49:09  
 * @Last Modified time: 2018-08-27 13:49:09 
 */
import Local from '@utils/local';

export default {
    myPlugin: store => {
        // 当 store 初始化后调用
        store.subscribe((mutation, state) => {
            Local.setItem("vuex", state);

            // 每次 mutation 之后调用
            // mutation 的格式为 { type, payload }
            // mutation.type.includes('SET_LOGINSTATUS') && store.commit('SET_USER',{nickname:''})
        });
    }
};