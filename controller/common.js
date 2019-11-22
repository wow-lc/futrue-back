const Result = require('../commons/result');

/**
 *  公共api
 */
module.exports = (router) => {
    /**
     *  上传文件
     */
    router.post('/common/upload',async ctx => {
        const { name, path, type } = ctx.request.files[''][0];
        const result = {
            name,
            path,
            type
        }
        ctx.body = Result.successResult(result);
    })
}