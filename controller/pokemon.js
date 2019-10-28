const dbHelper = require('../db/dbHelper');
const Result = require('../commons/result');

const Pokemon = dbHelper.getModel('pokemon');

/**
 * 宝可梦API
 */
module.exports = (router) => {

    /**
     * @path /pokemon/addPokemon
     * @params pokemon对象
     * @desc 增添宝可梦
     */
    router.post('/pokemon/addPokemon', async ctx => {
        const result = await Pokemon.find({ pid: ctx.request.body.pid })
        if (result.length > 0) {
            // ctx.status = 500
            ctx.body = Result.errorResult('编号已存在!')//{ msg: '编号已存在' }
        } else {
            let pokemon = new Pokemon({
                pid: ctx.request.body.pid,
                name: ctx.request.body.name,
                height: ctx.request.body.height,
                weight: ctx.request.body.weight,
                type: ctx.request.body.type,
                ability: ctx.request.body.ability,
                region: ctx.request.body.region
            })
            await pokemon.save()
                .then((res) => {
                    ctx.body = Result.successResult('添加成功!');
                })
                .catch(err => {
                    console.log(err)
                })
        }
    })
}