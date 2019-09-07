const config = {
    security: {
        secretKey: "secretKey",
        // 过期时间 一周
        expiresIn: 60 * 60 * 24 * 7
    },
    mongoUrl: 'mongodb://lc:654321@47.106.200.221:27017/blog'
}

module.exports = config;