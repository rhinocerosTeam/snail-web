<!--
时间点
-->
<template>
    <div class="timepointBox">
        <li>{{date}}</li>
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
                height: 25,
            }
        },
        /*content: [
            {
                id: 1,
                indexes: [1, 2, 3],
                text: "睡懒觉",
                flag: 1
            }
        ],*/
        props:{
           content:{
               type:Array,
               default:function(){
                   return []
               }
           },
            date:{
                type:String,
                default:function(){
                    return ""
                }
            }
        },
        methods: {},
        computed:{
            /*
            * box: [
                {id: 1, text: 's睡啦那s睡啦那几s睡啦那几s', flag: 0, indexes: 0},
                {id: 2, text: 's睡啦那几', flag: 1, indexes: [1, 2, 3, 4]},
             ]
            * */
            box:function(){
                let box = []
                for(let a=0;a<36;a++){
                    box.push({text: '', flag: 0, indexes: a})
                }
                let deleteBox = []
                this.content.map((obj)=>{
                    let startIndex = obj.indexes[0]
                    deleteBox.push(...obj.indexes.slice(1,obj.indexes.length))
                    box.splice(startIndex,1,obj)
                })

                box = box.filter((obj)=>{
                    return !deleteBox.includes(obj.indexes)
                })

                return  box
            }
        },
        mounted(){

//            setTimeout(()=>{
//                this.content.push({
//                    id: 2,
//                    indexes: [13,14,15],
//                    text: "睡懒觉33",
//                    flag: 2
//                })
//            },2000)

        },
        watch: {}

    }
</script>