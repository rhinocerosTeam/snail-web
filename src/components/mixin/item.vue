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
    <div>
        <li v-for="t,index in box" :style="styleUI(t)" :class="'status'+t.flag"
            :data-index="t.indexes.toString()" :data-id="t.id" :key="'timepoint_'+index+Math.random()*10">{{t.text}}
        </li>
    </div>
</template>
<script>
    import {ITEM_TYPE} from "@constant"
    export default{
        data(){
            return {
                ITEM_TYPE,
                length: 36,
                height: 25,
                width:25
            }
        },
        props: {
            /*content: [
             {
             id: 1,
             indexes: [1, 2, 3],
             text: "睡懒觉",
             flag: 1
             }
             ],*/
            content: {
                type: Array,
                default: function () {
                    return []
                }
            },
            itemNum: {
                type: Number,
                default: function () {
                    return 36
                }
            },
            type:{
                type: String,
                default: function () {
                    return 'timepoint'
                }
            }
        },
        methods: {
            styleUI(data){
                if(this.type == ITEM_TYPE.TIMEPOINT){
                    return {"height":this.height*(data.indexes.length)+'px'}
                }else{
                    return {"width":this.width*(data.indexes.length)+'px'}
                }
            }
        },
        computed: {
            /*
             * box: [
             {id: 1, text: 's睡啦那s睡啦那几s睡啦那几s', flag: 0, indexes: 0},
             {id: 2, text: 's睡啦那几', flag: 1, indexes: [1, 2, 3, 4]},
             ]
             * */
            box: function () {
                let box = []
                for (let a = 0; a < this.itemNum; a++) {
                    box.push({text: '', flag: 0, indexes: a})
                }
                let deleteBox = []
                this.content.map((obj) => {
                    let startIndex = obj.indexes[0]
                    deleteBox.push(...obj.indexes.slice(1, obj.indexes.length))
                    box.splice(startIndex, 1, obj)
                })

                box = box.filter((obj) => {
                    return !deleteBox.includes(obj.indexes)
                })

                return box
            }
        },
        mounted(){


        },
        watch: {}

    }
</script>
