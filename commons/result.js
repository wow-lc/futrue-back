/** 返回格式统一工具类 */
module.exports = {
    successResult: (data=null, msg='成功！') => {
        return {
            code: 1001,
            data,
            msg,
        }
    },
    errorResult: ( msg='系统内部错误！', err = null) => {
        return {
            code: 1002,
            data: err,
            msg,
        }
    },
    userCheckErrorResult: ( msg='请登录!', err = null) => {
        return {
            code: 1003,
            data: err,
            msg,
        }
    },
}