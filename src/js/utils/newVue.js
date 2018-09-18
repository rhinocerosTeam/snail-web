import Vue from 'vue'
import filters from "./filters";
import store from "../../store";

Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
export default (App, useList = []) => {
    //处理vue.use
    if (Array.isArray(useList) && useList.length) {
        useList.map((val) => {
            Vue.use(val)
        })
    }
    new Vue({
        el: '#app',
        store,
        template: '<App/>',
        components: {
            App
        }
    })
}