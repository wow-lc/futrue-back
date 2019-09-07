const mongoose = require('mongoose');
const config = require('../config');

// mongoose
module.exports = () => {
    mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
        .then( () => {
            console.log("mongo Connected ... ");
        })
        .catch((e) => {
            console.error('连接出错:' + e);
        });
}