<template>

    <ul class="timePointContainer">
        <time-point></time-point>
        <time-Content></time-Content>
    </ul>


</template>
<script>
    import timePoint from '@components/plan/timePoint'
    import timeContent from '@components/plan/timeContent.vue'
    require('webpack-jquery-ui/selectable');
    import '@css/plan/index.scss'
    import '@css/common/common.scss'
    export default {
        data(){
            return {

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
                    $(".timePointContainer > div").selectable();
                });
            })

        }
    }
</script>