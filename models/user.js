module.exports = {
    username: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now(),
    }
};