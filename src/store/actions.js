/*
 * @Author: 徐长剑 
 * @Description: vuex 定义action文件
 * @Date: 2018-08-27 13:49:09  
 * @Last Modified time: 2018-08-27 13:49:09 
 */
import api from "api";

let noop = () => {};

export default {
    setUser: ({ commit }, data) => {
        commit("SET_USERS", data);
    },
};
