<template>
    <div class="cont">
        <ul class="timePointContainer">
            <plan-title></plan-title>
            <div v-for="obj in recordArray" class="calContainer">
                <span>{{obj.date}}</span>
                <item :content="obj.content" type="day" :itemNum="recordNum"></item>
            </div>
        </ul>
        <ul class="rightMenu">
            <li @click="addRecord()">标记为计划时间</li>
            <li @click="addRecord()">标记为完成时间</li>
            <li class="resetBtn" @click="reset()" v-show="showResetBtn">重置</li>
        </ul>
    </div>
</template>
<script>
    import planTitle from '@components/plan/planTitle.vue'
    import item from '@components/common/item.vue'
    import selectableM from '@components/mixin/selectable.js'
    require('webpack-jquery-ui/selectable');
    import '@css/plan/index.scss'
    import '@css/common/common.scss'
    export default {
        mixins: [selectableM],
        data(){
            return {
                recordNum:31,
                recordArray: [
                    {

                        date: '9.23',
                        content: [
                            {
                                id: 1,
                                indexes: 1,
                                text: "2",
                                flag: 1
                            }
                        ]
                    },
                    {

                        date: '9.24',
                        content: [
                            {
                                id: 1,
                                indexes: 5,
                                text: "2",
                                flag: 2
                            }
                        ]
                    }
                ],
                showResetBtn: false
            }
        },
        components: {
            planTitle,
            item
        },
        methods: {
            addRecord(){

                let indexes = this.getIndexes_mixin()
                let timepointBoxIndex = $(".calContainer").index($(".ui-selected").parent().parent())

                indexes.map(index=>{
                    this.recordArray[timepointBoxIndex].content.push({
                        id: index,
                        indexes: index,
                        text: "11",
                        flag: 2
                    })
                })
                this.clearSelected_mixin()



            },
            reset(){
                let timepointBoxIndex = $(".calContainer").index($(".ui-selected").parent().parent().parent())
                let id = $(".ui-selected").attr("data-id")
                let contentSort = this.recordArray[timepointBoxIndex].content
                contentSort.splice(contentSort.findIndex((obj)=>{return obj.id == id}),1)

            }
        },
        mounted(){


        }
    }
</script>