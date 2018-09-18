//0:回放 √ 1：动态 √ 2：帖子 √ 3：文章 × 10：综艺  √
const CATEGORY = {
    playback: 0,
    dynamic: 1,
    post: 2,
    article: 3,
    variety: 10
}
//messageType: 1：文字动态 √ 2：图片动态 √ 3：视频动态 √ 4:文章 √ 10：视频帖子√ 11：图文帖子 √ 12：纯文字帖子 √ 13：活动帖子 × 14:应援帖子 × 15：小视频 √ 16：抓取咨询 × 17：软文 × 18：小视频帖子 √ 19：投票帖子 ×
const MESSAGETYPE = {
    text: 1,
    picture: 2,
    video: 3,
    article: 4,
    postVideo: 10,
    postPicture: 11,
    postText: 12,
    postActivity: 13,
    postSupport: 14,
    littleVideo: 15,
    postLittleVideo: 18,
    postVote: 19
}
/*动态分类*/
const DYNAMIC_CLASSIFY =[
    MESSAGETYPE.text,
    MESSAGETYPE.picture,
    MESSAGETYPE.video,
    MESSAGETYPE.article,
    MESSAGETYPE.littleVideo,
]
/*帖子分类*/
const POST_CLASSIFY =[
    MESSAGETYPE.postVideo,
    MESSAGETYPE.postPicture,
    MESSAGETYPE.postText,
    MESSAGETYPE.postLittleVideo,
]



const PICTURE_CLASSIFY=[
    MESSAGETYPE.picture,
    MESSAGETYPE.postPicture,
]

const VIDEO_CLASSIFY=[
    MESSAGETYPE.video,
    MESSAGETYPE.postVideo,
    MESSAGETYPE.littleVideo,
    MESSAGETYPE.postLittleVideo,
]


// 1:H5站内跳  6:html站外  7:动态页  8:综艺列表  9:综艺详情   13:文章(资讯详情)  14:文章列表   16:节目(具体某一期的综艺)   18:普通帖子   19:活动帖子
const JUMPCENTER = {
    jumpIn:1,
    jumpOut:6,
    dynamic:7,
    varietyDetail:9,
    articleDetail:13,
    articleList:14,
    program:16,
    post:18,
    postActivity:19
}
const JUMPCENTER_ARRAY=[
    JUMPCENTER.jumpIn,
    JUMPCENTER.jumpOut,
    JUMPCENTER.dynamic,
    JUMPCENTER.varietyDetail,
    JUMPCENTER.articleDetail,
    JUMPCENTER.articleList,
    JUMPCENTER.program,
    JUMPCENTER.post
]

// 0->用户 、1->网红、2->明星、3->片场、4->内部员工 5->经纪人 6->虚拟币用户 9->新秀 10->艺人 11->机构
const USER_TYPE ={
    consumer:0,
    celebrity:1,
    star:2,
    location:3,
    InternalStaff:4,
    middleman:5,
    virtualCoinUser:6,
    podcast:9,
    artist:10,
    institution:11
}
const FORK_FANS_LIST=[  // 记录 关注列表 粉丝列表 需要添加身份标识的 用户类型
    USER_TYPE.star,
    USER_TYPE.location,
    USER_TYPE.artist,
    USER_TYPE.institution
]

export {CATEGORY, MESSAGETYPE,PICTURE_CLASSIFY,VIDEO_CLASSIFY,
    JUMPCENTER, JUMPCENTER_ARRAY,
    USER_TYPE, FORK_FANS_LIST,DYNAMIC_CLASSIFY,POST_CLASSIFY }


export default {
    isIe9: 'false',
}