/**
 * Created by VULCAN on 2018/8/8.
 */
import api from 'api' // 引用 API
import ImgSetting from "@share/common/img-setting"

export default {
    /**
     * 初始化榜单data数据
     * @param pageSize
     * @returns {{pageNo: number, pageSize: number, periods: Array, cycleNum: string, upRankData: Array, rankName: string, showRankData: Array, prevRankData: null}}
     */
    rankData(rankCycle, pageSize = 20) {
        return {
            pageNo: 1,
            pageSize,
            periods: [], // 期数时间数组
            upRankData: [], // 排行榜总数据
            rankCycle, // 榜单维度
            rankName: 'star', // 当前榜单
            cycleNum: 'newest', // 当前期数的对应id
            showRankData: [], // 当前展示的排行榜数据
            prevRankData: null, // 有排行榜总数据前获取到的最新一期数据
            scrollTop: 0, // 当前滚动位置
            dataLoading: false, // 是否在读取数据
            isOver: false, // 是否全部加载完成
            loadType: '' // load组件状态
        }
    },

    /**
     * 设置排行榜期数
     * @param periods 期数时间数组
     */
    setSelect(data) {
        api[data.rankCycle + 'NumList']().then(res => {

            if (res.data) {
                data.periods.push(...res.data)
                this.initRankData(data)
            }
        })
    },
    /**
     * 初始化排行榜总数据
     * @param periods 期数时间数组
     */
    initRankData(data) {
        // 为排行榜总数据添加初始数据
        data.periods.forEach((period, index) => {
            let obj = {
                cycleNum: period.weekNum ? period.weekNum : period,
                star: [],
                fanClub: [],
                userFans: []
            }
            data.upRankData.push(obj)
        })
        // 如果星光榜接口先有数据返回，设置最新一期星光榜数据
        if (data.prevRankData) {
            data.upRankData[0].star = []
            data.upRankData[0].star.push(...data.prevRankData)
            data.prevRankData = null
        }
        // 当前期数为最新一期星光榜期数
        if (data.periods[0].weekNum) {
            data.cycleNum = data.periods[0].weekNum
        } else {
            data.cycleNum = data.periods[0]
        }
    },

    /**
     * 请求排行榜数据
     */
    queryRankData(data) {
        let param = {
            pageNo: data.pageNo,
            pageSize: data.pageSize,
        }
        if (data.rankCycle === 'week') {
            param.weekNum = data.cycleNum
        } else {
            param.yearMonth = data.cycleNum
        }
        if (data.cycleNum === 'newest') {
            // 没有排行榜总数据
            if (param.weekNum) param.weekNum = ''
            if (param.yearMonth) param.yearMonth = ''
        } else if (data.pageNo === 1) {
            // 有排行榜总数据
            let currentIndex = this.getCurrentIndex(data),
                resultList = []
            // 有总数据时读取数据
            if (currentIndex > -1) resultList = data.upRankData[currentIndex][data.rankName].map(item => item)
            // 当前显示数据为排行榜总数据中存储的内容
            this.setShowRankData(data, resultList)
        }
        data.loadType = 'loading'
        api[data.rankName + data.rankCycle + 'Ranking'](param).then(res => {
            if (res.data) this.setRankData(data, res.data.resultList)
            data.dataLoading = false
        })
    },
    /**
     * 设置排行榜数据
     * @param resultList
     */
    setRankData(data, resultList) {
        // 全部加载完成
        if (resultList.length < data.pageSize) {
            data.isOver = true
            data.loadType = 'noMore'
        }
        switch (data.pageNo) {
            case 1: // 排行榜总数据中是否有当前期数（排行榜期数接口是否返回并初始化排行榜总数据）
                let currentIndex = this.getCurrentIndex(data)
                if (!resultList.length) {
                    data.loadType = ''
                }
                if (currentIndex > -1) {
                    resultList.forEach((item, index) => {
                        // 排行榜总数据中对应当前一条的数据
                        let currentItem = data.upRankData[currentIndex][data.rankName][index],
                            // 排行榜总数据中对应的头像地址
                            oldImage = this.getImageUrl(data, currentItem),
                            // 接口返回数据中对应的头像地址
                            newImage = this.getImageUrl(data, item)
                        if (item.headImg) item.headImg = this.setImage(oldImage, newImage)
                        if (item.signImgUrl) item.signImgUrl = this.setImage(oldImage, newImage)
                    })
                    // 为排行榜总数据添加此条数据
                    data.upRankData[currentIndex][data.rankName] = []
                    data.upRankData[currentIndex][data.rankName].push(...resultList)
                } else {
                    // 索引为-1时表示排行榜期数接口未返回或未初始化排行榜总数据
                    this.setNewImg(data, resultList)
                    data.prevRankData = resultList
                }
                this.setShowRankData(data, resultList)
                break
            default:
                this.setNewImg(data, resultList)
                data.showRankData.push(...resultList)
                break

        }
        if (resultList.length >= data.pageSize) {
            data.loadType = 'loadMore'
        }
    },

    /**
     * 为没有存储过的数据添加新的头像地址
     * @param resultList
     */
    setNewImg(data, resultList) {
        return resultList.forEach((item, index) => {
            // 排行榜总数据中对应当前一条的数据
            let newImage = this.getImageUrl(data, item)
            if (item.headImg) item.headImg = this.setImage('', newImage)
            if (item.signImgUrl) item.signImgUrl = this.setImage('', newImage)
        })
    },
    /**
     * 返回排行榜总数据中当前期数索引
     * @returns {*} 前期数索引
     */
    getCurrentIndex(data) {
        return data.upRankData.findIndex(item => parseInt(item.cycleNum) === parseInt(data.cycleNum))
    },
    /**
     * 设置当前需要展示的数据
     */
    setShowRankData(data, resultList) {
        data.showRankData = []
        data.showRankData.push(...resultList)
    },
    /**
     * 获取接口返回或本地存储的img路径
     * @param between
     * @param resultList
     * @returns {*} img路径
     */
    getImageUrl(data, resultList) {
        if (!resultList) return ''
        let imgName = data.rankName === 'fanClub' ? 'signImgUrl' : 'headImg'
        return resultList[imgName]
    },
    /**
     * 返回图片地址
     * @param oldImage 本地存储的img
     * @param newImage 接口返回的img
     * @returns {*}
     */
    setImage(oldImage, newImage) {
        let isImageEqual = this.isImageEqual(oldImage, newImage)
        if (isImageEqual) return oldImage
        return ImgSetting.formatOss(newImage, 100, 100)
    },
    /**
     * 判断两个img地址是否一样
     * @param image 本地存储的img
     * @param newImage 接口返回的img
     * @returns {boolean} 返回boolean值
     */
    isImageEqual(image, newImage) {
        if (!image) return false
        let index = image.indexOf('?')
        if (index > 0) image = image.substr(0, index)
        return newImage === image
    },

    /**
     * 跳转页面
     * @param rankName 排行榜名称
     * @param item 用户信息
     * @returns {string} 跳转地址
     */
    goHtml(rankName, item) {
        let userId = 0
        switch (rankName) {
            case 'star':
                userId = item.idolUserId ? item.idolUserId : item.userId
                return window.location.href = './club.html?userId=' + userId
                break
            case 'fanClub':
                break
            case 'userFans':
                userId = item.userId
                return window.location.href = './club.html?userId=' + userId
                break
            default:
                break
        }
    }
}