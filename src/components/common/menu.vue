<!--
/**
* @Author: user
* @Date:2018/9/20
* @Last Modified time: 2018/9/20
* @Description: 描述
* @Query: 页面参数
* @Props: 组件参数
* @Remark: 
    - 备注一
*/
-->
<template>
    <div class="menuContainer" v-if="isShow">
        <slot name="option"></slot>
    </div>
</template>
<script>
    export default {
        data(){
           return {
               isShow:false
           }
        },
        methods:{
            show(){
                this.isShow = true
            },
            hidden(){
                this.isShow = false
            }
        },
        mounted:{

        }
    }
</script>
<style>
    .menuContainer {
        position: absolute;
        top: 0;
        left: 0;
        width: 120px;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
    }
    .menuContainer li{
        border:1px solid red;
    }
</style>
