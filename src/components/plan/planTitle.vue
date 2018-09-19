<!--
/**
* @Author: user
* @Date:2018/9/19
* @Last Modified time: 2018/9/19
* @Description: 描述
* @Query: 页面参数
* @Props: 组件参数
* @Remark: 
    - 备注一
*/
-->
<template>
    <div class="titleContainer">
        <span>计划项</span>
        <li v-for="day in titles">
            {{day}}
        </li>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                titles:[]
            }
        },
        mounted(){
            for(let i=0;i<31;i++) this.titles.push(i+1)
        }
    }
</script>