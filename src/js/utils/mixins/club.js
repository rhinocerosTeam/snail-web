/*
 * @Author: guozongwei 
 * @Description: 个人主页页面 mixins。
 * @Date: 2018-08-15 18:46:17 
 * @Last Modified by: guozongwei
 * @Last Modified time: 2018-08-21 14:56:29
 */
import 'babel-polyfill'
import Utils from "@share/utils/utils"
import api from 'api';
import loadBar from '@components/common/loadBar'
export default {
    props: ['modelType'],
    data() {
        return {
            userId: Utils.getQueryString("userId"),
            messageData: [],
            nodata: false,
            isAjaxing: false,
            empty: false, //暂无数据
            loadType: ''
        }
    },
    components: {
        loadBar
    },
    methods: {
        //加载更多按钮
        loadMore() {
            this.scrollEvent()
        },
        /**
         * 获取动态、视屏等列表数据
         * */
        async getDynamicData() {
            this.loadType = 'loading'
            let dynamicData = await api.getDynamicList({
                userId: this.userId,
                type: this.type,
                pageSize: this.pageSize,
                pageNo: this.pageNo
            })
            if (dynamicData.data) {
                //动态，帖子类型
                if (this.type == 1 || this.type == 2) {

                    this.messageData.push(...dynamicData.data)

                } else {
                    //this.type == 3 视频数据 isOrdinary普通用户与非普通用户样式及数据格式均不一样

                    if (!this.isOrdinary) {

                        let videoList = dynamicData.data,
                            newList = [];
                        //this.type == 3 视频数据转化成car组件所需的数据格式
                        videoList.map((val) => {

                            if (val.messageInfo.videoPath || (!val.messageInfo.videoPath && this.webUserInfo && this.userId == this.webUserInfo.userId)) {

                                newList.push({
                                    userId: this.userId,
                                    id: val.messageInfo.messageId,
                                    imgUrl: val.messageInfo.coverImg,
                                    title: val.messageInfo.title,
                                    videoLength: val.messageInfo.videoLength,
                                    readCount: val.messageInfo.readCount,
                                    messageTime: Utils.getVideoTime(val.messageInfo.messageTimestamp),
                                    videoPath: val.messageInfo.videoPath,
                                    // videoPath: '',
                                    praiseType: val.messageInfo.praiseType,
                                    category: val.messageInfo.category,
                                    varietyId: val.messageInfo.varietyId,
                                    praiseCount: val.messageInfo.praiseCount
                                })
                            }

                        })

                        this.videoList.push(...newList)
               
                        if (this.pageNo == 1 && !this.videoList.length) this.loadType = 'empty'
                    } else {
                        this.messageData.push(...dynamicData.data)
                    }

                }

                let len = dynamicData.data.length
                if (len < this.pageSize) {
                    this.loadType = 'noMore'
                }
                if (this.pageNo == 1 && len == 0) {
                    this.loadType = 'empty'
                }
                if (len >= 20) {
                    this.loadType = 'loadMore'
                }
            } else {
                this.loadType = 'empty'
            }



            this.$nextTick(() => {
                if (this.modelType == this.mType) {
                    //有些数据不满足展示条件，判断存在此种有数据但不展示时的情况
                    if ($(".dynamicList ._components__messageInfo").length == 0) {
                        this.empty = true
                        this.loadType = 'empty'
                    } else {
                        this.empty = false
                    }
                }

            })
        }
    },

    mounted() {},
    watch: {
        modelType: {
            handler() {
                if (this.modelType == this.mType) {
                    //！！！！此处滚动时用jq获取高及滚动位置，浪费性能不合理，待优化
                    $(window).off('scroll');
                    // $(window).on('scroll', () => {
                    //     let winH = $(window).height(),
                    //         scrollH = $(window).scrollTop(),
                    //         bodyH = $('body').height(),
                    //         footerH = $('.footerBox').height();
                    //     //条件  屏幕高度+滚动高度>中间能容高度  ， 有数据且有更多数据， 未在ajax请求中
                    //     if ((winH + scrollH >= bodyH - footerH) && !this.nodata && !this.isAjaxing && !this.empty) {
                    //         this.scrollEvent()
                    //     }

                    // });
                } else if (this.modelType == 'fansFork') {
                    //关注时解除滚动事件绑定
                    $(window).off('scroll');
                }
            },
            immediate: true

        }
    }
}