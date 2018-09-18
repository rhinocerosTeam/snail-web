<!--
时间点
-->
<template>
    <div class="timepointBox">
        <li>9.23</li>
        <li v-for="t in box" :style="{height:height*(t.indexes.length)+'px'}" :class="'status'+t.flag"
            :data-index="t.indexes.toString()">{{t.text}}
        </li>
    </div>


</template>
<script>
    export default{
        data(){
            return {
                length: 36,
                content: [
                    {
                        id: 1,
                        indexes: [1, 2, 3],
                        text: "睡懒觉",
                        flag: 1
                    },
                    {
                        id: 2,
                        indexes: [7, 8, 9],
                        text: "睡懒觉22",
                        flag: 2
                    },
                ],
               /* box: [
                    {id: 1, text: 's睡啦那s睡啦那几s睡啦那几s', flag: 0, indexes: [0]},
                    {id: 2, text: 's睡啦那几', flag: 1, indexes: [1, 2, 3, 4]},
                    {id: 3, text: 's睡啦那几', flag: 2, indexes: [5, 6, 7, 8]}
                ],*/
                height: 25,

            }
        },
        methods: {},
        computed:{
            box:function(){
                let box = []
                for(let a=0;a<36;a++){
                    box.push({text: '', flag: 0, indexes: [a]})
                }
                this.content.map((obj)=>{
                    let startIndex = obj.indexes[0]
                    box.splice(startIndex,obj.indexes.length,obj)
                })
                return  box
            }
        },
        mounted(){

            setTimeout(()=>{
                this.content.push({
                    id: 2,
                    indexes: [13,14,15],
                    text: "睡懒觉33",
                    flag: 2
                })
            },2000)

        },
        watch: {}

    }
</script>