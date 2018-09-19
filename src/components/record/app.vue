<template>
    <div class="cont">
        <ul class="timePointContainer">
            <time-point></time-point>
            <time-Content v-for="obj in recordArray" :content="obj.content" :date="obj.date"></time-Content>
        </ul>
        <ul class="rightMenu">
            <li @click="addRecord()">汇报完成情况</li>
            <li class="resetBtn" @click="reset()" v-show="showResetBtn">重置</li>
        </ul>
    </div>
</template>
<script>
    import timePoint from '@components/record/timePoint'
    import timeContent from '@components/record/timeContent.vue'
    require('webpack-jquery-ui/selectable');
    import '@css/plan/index.scss'
    import '@css/common/common.scss'
    export default {
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
            timeContent
        },
        methods: {
            addRecord(){
                let indexes = []
                let timepointBoxIndex = $(".timepointBox").index($(".ui-selected").parent())
                $(".ui-selected").each(function () {
                    var indexStr = $(this).attr("data-index");
                    let indexSort = indexStr.split(",")
                    indexSort = indexSort.map((iObj) => {
                        return parseInt(iObj)
                    })
                    indexes.push(...indexSort)
                });
                $(".timePointContainer > div li").removeClass("ui-selected")
                this.recordArray[timepointBoxIndex].content.push({
                    id: 1,
                    indexes: indexes,
                    text: "无名氏",
                    flag: 2
                })
            },
            reset(){
                let timepointBoxIndex = $(".timepointBox").index($(".ui-selected").parent())
                let id = $(".ui-selected").attr("data-id")
                let contentSort = this.recordArray[timepointBoxIndex].content
                contentSort.splice(contentSort.findIndex((obj)=>{return obj.id == id}),1)

            }
        },
        mounted(){
            this.$nextTick(() => {
                let _this = this
                $(function () {

                    document.oncontextmenu = function () {
                        return false;
                    }

                    $(document).mousedown(function (e) {
                        var key = e.which; //获取鼠标键位
                        if (key == 3)  //(1:代表左键； 2:代表中键； 3:代表右键)
                        {
                            //获取右键点击坐标
                            var x = e.clientX;
                            var y = e.clientY;

                            var selectedNum = $(".ui-selected").length

                            if (selectedNum < 1) {
                                return
                            }

                            _this.showResetBtn = false
                            if (selectedNum == 1 && $(".ui-selected").attr("data-id")) {
                                _this.showResetBtn = true
                            }

                            $(".rightMenu").show().css({left: x, top: y});


                        }
                    });

                    //点击任意部位隐藏
                    $(document).click(function () {
                        $(".rightMenu").hide();
                    })

                    $(".timePointContainer > div").selectable({
                        start: function () {
                            $(".rightMenu").hide();
                            $(".timePointContainer > div li").removeClass("ui-selected")
                            console.log('star')
                        },
                        stop: function () {
                            console.log('stop')
                        }
                    });
                });
            })

        }
    }
</script>