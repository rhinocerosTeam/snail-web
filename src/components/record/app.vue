<template>
<div class="cont">
    <ul class="timePointContainer">
        <time-point></time-point>
        <time-Content v-for="obj in recordArray" :content = "obj.content" :date="obj.date"></time-Content>
    </ul>
    <div class="rightMenu">qqqqq</div>
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
                recordArray:[
                    {

                        date: '9.23',
                        content:[
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
                        content:[
                            {
                                id: 1,
                                indexes: [2, 3, 4],
                                text: "睡懒觉",
                                flag: 2
                            }
                        ]
                    }
                ]

            }
        },
        components:{
            timePoint,
            timeContent
        },
        methods:{

        },
        mounted(){
            this.$nextTick(()=>{
                $(function() {

                    document.oncontextmenu = function(){
                        return false;
                    }

                    $(document).mousedown(function(e){
                        var key = e.which; //获取鼠标键位
                        if(key == 3)  //(1:代表左键； 2:代表中键； 3:代表右键)
                        {
                            //获取右键点击坐标
                            var x = e.clientX;
                            var y = e.clientY;

                            $(".rightMenu").show().css({left:x,top:y});
                        }
                    });

                    //点击任意部位隐藏
                    $(document).click(function(){
                        $(".rightMenu").hide();
                    })

                    $(".timePointContainer > div").selectable({
                        start:function(){
                            $(".rightMenu").hide();
                            $(".timePointContainer > div li").removeClass("ui-selected")
                            console.log('star')
                        },
                        stop:function(){
                            console.log('stop')
                        }
                    });
                });
            })

        }
    }
</script>