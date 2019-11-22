const jwt = require("jsonwebtoken");
const config = require("../config/constConfig");

const crypto = require('crypto') 
const Identicon = require('identicon.js') 

const secret = config.security.secretKey;

/** 
 * 创建token
 * 
 * @param {*} payload
 * */
exports.getToken = (payload = {}) => {
  return jwt.sign(payload, secret, {
    expiresIn: config.security.expiresIn
  });
};

/**
 * 通过token获取JWT的payload部分 
 * 
 * @param {*} token
 * */
exports.getJWTPayload = token => {
  // 验证并解析JWT
  return jwt.verify(token.split(" ")[1], secret);
};

/**
 * 生成随机头像
 * 
 * @param {*} username
 */
exports.randomHashAvatar = (username) => {
    let hash = crypto.createHash('md5')
    hash.update(username); // 传入用户名
    let imgData = new Identicon(hash.digest('hex')).toString()
    return'data:image/png;base64,'+imgData;
}

/**
 * 密码加密
 */
exports.cryptoPwd = (pwd) => {
    let md5 = crypto.createHash("md5");
    return md5.update(pwd).digest("hex");;
}