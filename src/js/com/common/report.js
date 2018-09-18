/**
 * Created by user on 2018/8/13.
 */

import {HTML_LINK} from 'api/config'
import {CATEGORY, MESSAGETYPE} from '@common/constant'
export default {
    /**
     * 跳转到举报页面
     * @param data 动态列表 、动态详情、评论
     * @param type list： 动态列表 、detail: 动态详情、comment:评论 reply:回复
     **/
    toReportPage(data, type){
        let reportType = 1; //1 动态举报 2 评论举报 3 举报主播 4 举报观看直播用户 5帖子举报）
        let reportData = {
            reportedUserId: '',
            reportType: '', //1 动态举报 2 评论举报 3 举报主播 4 举报观看直播用户 5帖子举报）
            contendId: '',  //reportType 为 1、2 为对应动态|评论id
            content: '',
            headImg: '',
            nickName: '',
            userType: '',
            messageTimestamp: ''
        }

        switch (type) {
            case 'list':

                reportType = this.getReportType(data.messageInfo.messageType)

                reportData = {
                    reportedUserId: data.userInfo.userId,
                    reportType,
                    contendId: data.messageInfo.messageId,  //reportType 为 1、2 为对应动态|评论id
                    content: data.messageInfo.messageAbstract||data.messageInfo.title,
                    headImg: data.userInfo.headImg,
                    nickName: data.userInfo.nickName,
                    messageTimestamp: data.messageInfo.messageTimestamp,
                    userType: data.userInfo.userType,
                    sourceType:data.messageInfo.sourceType,
                    sourceName:data.messageInfo.sourceName
                }
                break;

            case 'detail':

                reportType = this.getReportType(data.messageInfo.messageType)

                reportData = {
                    reportedUserId: data.userInfo.userId,
                    reportType,
                    contendId: data.messageInfo.messageId,  //reportType 为 1、2 为对应动态|评论id
                    content: data.messageInfo.title||data.messageInfo.messageAbstract,
                    headImg: data.userInfo.headImg,
                    nickName: data.userInfo.nickName,
                    messageTimestamp: data.messageInfo.messageTime,
                    userType: data.userInfo.userType,
                    sourceType:data.messageInfo.source,
                    sourceName:data.messageInfo.sourceName
                }
                break;
            case 'comment':
                 reportData = {
                    reportedUserId: data.resUserId,
                    reportType: 2, //1 动态举报 2 评论举报 3 举报主播 4 举报观看直播用户 5帖子举报）
                    contendId: data.resCommentsId,  //reportType 为 1、2 为对应动态|评论id
                    content: data.resCommentsInfo,
                    headImg: data.resHeadImg,
                    nickName: data.resNickName,
                    messageTimestamp: data.resCommentsTimeStamp,
                    userType: data.resUserType,
                }
                break;
            case 'reply':
                let parentComment = data.parentComment
                 reportData = {
                    reportedUserId: parentComment.parentUserId,
                    reportType: 2, //1 动态举报 2 评论举报 3 举报主播 4 举报观看直播用户 5帖子举报）
                    contendId: parentComment.parentCommentsId,  //reportType 为 1、2 为对应动态|评论id
                    content: parentComment.parentCommentsInfo,
                    headImg: parentComment.parentHeadImg,
                    nickName: parentComment.parentNickName,
                    messageTimestamp: parentComment.parentCommentsTimeStamp,
                    userType: parentComment.resUserType,
                }
                break;
        }


        let link = `${HTML_LINK}/report.html?d=${encodeURIComponent(JSON.stringify(reportData))}`
        window.open(link)

    },


    /**
     * 得到举报的类型
     * */
    getReportType(reportType){

        console.log('=======>reportType',reportType)

       let type =  parseInt(reportType)

        let postTypeSort = [
            MESSAGETYPE.postVideo,
            MESSAGETYPE.postPicture,
            MESSAGETYPE.postText,
            MESSAGETYPE.postLittleVideo
        ]

        let dynamicTypeSort = [
            MESSAGETYPE.text,
            MESSAGETYPE.article,
            MESSAGETYPE.picture,
            MESSAGETYPE.video,
            MESSAGETYPE.littleVideo
        ]

        if (postTypeSort.indexOf(type) > -1) {
            return 5
        } else if (dynamicTypeSort.indexOf(type) > -1) {
            return 1
        } else {
            return 1
        }

    }
}