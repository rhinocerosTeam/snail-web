<template>
    <div class="cont">
        <ul class="timePointContainer">
            <time-point></time-point>
            <div v-for="obj in recordArray" class="timepointBox">
                <span class="rheader">{{obj.date}}</span>
                <item :content="obj.content"></item>
            </div>
            <!--<time-Content v-for="obj in recordArray" :content="obj.content" :date="obj.date"></time-Content>-->
        </ul>
        <ul class="rightMenu">
            <li @click="addRecord()">汇报完成情况</li>
            <li class="resetBtn" @click="reset()" v-show="showResetBtn">重置</li>
        </ul>
    </div>
</template>
<script>
    import timePoint from '@components/record/timePoint'
    import item from '@components/common/item.vue'
    import selectableM from '@components/mixin/selectable.js'
    require('webpack-jquery-ui/selectable');
    import '@css/record/index.scss'
    import '@css/common/common.scss'
    export default {
        mixins: [selectableM],
        data(){
            return {
                recordArray: [
                    {

                        date: '9.23',
                        content: [
                            {
                                id: 1,
                                indexes: [1, 2, 3],
                                text: "睡懒觉",
                                flag: 1
                            }
                        ]
                    },
                    {

                        date: '9.24',
                        content: [
                            {
                                id: 1,
                                indexes: [2, 3, 4],
                                text: "睡懒觉",
                                flag: 2
                            }
                        ]
                    }
                ],
                showResetBtn: false
            }
        },
        components: {
            timePoint,
            item
        },
        methods: {
            addRecord(){

                let indexes = this.getIndexes_mixin()
                let timepointBoxIndex = $(".timepointBox").index($(".ui-selected").parent().parent())


                this.recordArray[timepointBoxIndex].content.push({
                    id: 1,
                    indexes: indexes,
                    text: "无名氏",
                    flag: 2
                })
                this.clearSelected_mixin()
            },
            reset(){
                let timepointBoxIndex = $(".timepointBox").index($(".ui-selected").parent().parent())
                let id = $(".ui-selected").attr("data-id")
                let contentSort = this.recordArray[timepointBoxIndex].content
                contentSort.splice(contentSort.findIndex((obj)=>{return obj.id == id}),1)

            }
        },
        mounted(){


        }
    }
</script>