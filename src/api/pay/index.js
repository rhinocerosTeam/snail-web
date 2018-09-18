/**
 * Created by user on 2017/11/3.
 */
import {API_HOST, PAY_HOST, PASSPORT_HOST} from '../config';


export default {
    /**
     * 获得用户信息
     * @param displayUserId 用户ID
     * @returns {*}
     */
    findUserInfo(displayUserId){
        return $.ajax({url: API_HOST + '/v1/h5/getUserByDisplayUserId', dataType: 'json', data: this.paramFormat({displayUserId})});
    },

    /**
     * 获得饭票信息
     * @param userName
     * @param pwd
     * @returns {*}
     */
    doRechargeForPc(userId, type){
        return $.ajax({url: API_HOST + '/pub/rechargeForPc', dataType: 'json', data: this.paramFormat({userId, type})});
    },

    /**
     * 支付订单
     * @param userName
     * @param pwd
     * @returns {*}
     */
    doPcPayOrder(objData){
        return $.ajax({url: PAY_HOST + '/pub/pcPayOrder', dataType: 'json', data: this.paramFormat(objData)});
    },

    /**
     * 查询订单
     * @param userName
     * @param pwd
     * @returns {*}
     */
    doGetTradeLogByOrderId(orderId){
        return $.ajax({
            url: PAY_HOST + '/pub/getTradeLogByOrderId',
            dataType: 'json',
            data: this.paramFormat({orderId})
        });
    },

    /**
     * 查询兑换码
     * @param userName
     * @param pwd
     * @returns {*}
     */
    doValidate(code, userId){
        return $.ajax({url: API_HOST + '/v1/h5/validate', dataType: 'json', data: this.paramFormat({code, userId})});
    },

    /**
     * 兑换码支付
     * @param userName
     * @param pwd
     * @returns {*}
     */
    doRechargeCodePay(code, userId){
        return $.ajax({url: API_HOST + '/v1/h5/rechargeCodePay', dataType: 'json', data: this.paramFormat({code, userId, source: 1})});
    },
    doLogin(mobile, msCode){
        let params = {
            userSource: 5,
            mobile,
            msCode,
        }
        return $.ajax({url: PASSPORT_HOST + "/v1/h5/userLogin", dataType: 'json', data: this.paramFormat(params)});
    },
    sendCode(mobile){
        let params = {
            smsType: 1,
            mobile
        }
        return $.ajax({url: API_HOST + "/v1/sms/send", dataType: 'json', data: this.paramFormat(params)});
    },


}

