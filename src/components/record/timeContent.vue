<!--
时间点
-->
<template>
    <div class="timepointBox">
        <li>9.23</li>
        <li v-for ="t in box" :style="{height:height*(t.index.length+1)+'px'}" :class="'status'+t.flag">{{t.text}}</li>
    </div>


</template>
<script>
    export default{
        data(){
            return {
                length:36,
                content:[{
                    id:1,
                    index:[1,2,3],
                    content:"睡懒觉",
                }],
                box:[
                    {text:'s睡啦那几',flag:0,index:[0]},
                    {text:'s睡啦那几',flag:1,index:[1,2,3,4]},
                    {text:'s睡啦那几',flag:2,index:[5,6,7,8]}
                ],
                height:25,

            }
        },
        methods:{


        },
        mounted(){

        },
        watch:{

        }

    }
</script>