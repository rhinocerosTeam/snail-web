/*
 * @Author: 徐长剑 
 * @Description: vuex 设置state文件文件
 * @Date: 2018-08-27 13:49:09  
 * @Last Modified time: 2018-08-27 13:49:09 
 */
export default {

  //设置登陆信息
  SET_USERS(state, data) {
    state.users = Object.assign({}, state.users, data)
  },
  
}
