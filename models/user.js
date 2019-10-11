module.exports = {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createDate:{
        type: Date,
        default: Date.now(),
    }
};