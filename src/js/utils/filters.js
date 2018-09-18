/**
 * 阅读量转化成万单位
 * @param num  需转化的值
 * @returns {string} 转化后的值
 */
exports.toMillion = (value) => {
    return value && Number(value) > 9999 ? (Number(value) / 10000).toFixed(1) + '万' : Number(value);
}