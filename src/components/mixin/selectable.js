/**
 * Created by songpeilan on 2018/9/19.
 */
export default {
    data(){

    },
    methods:{
        /*得到所有的选中的索引*/
        getIndexes_mixin(){
            let indexes = []
            $(".ui-selected").each(function () {
                var indexStr = $(this).attr("data-index");
                let indexSort = indexStr.split(",")
                indexSort = indexSort.map((iObj) => {
                    return parseInt(iObj)
                })
                indexes.push(...indexSort)
            });
            return indexes
        },
        /*去除所有已经选中的元素*/
        clearSelected_mixin(){
            $(".ui-selectable li").removeClass("ui-selected")
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

                $(".itemBox").selectable({
                    start: function () {
                        $(".rightMenu").hide();
                        //$(".itemBox").removeClass("ui-selected")
                        _this.clearSelected_mixin()
                        console.log('star')
                    },
                    stop: function () {
                        console.log('stop')
                    }
                });
            });
        })
    },
}