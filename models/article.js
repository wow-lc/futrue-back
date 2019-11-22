module.exports = article = {
    title: {
        type: String,
        required: true,
    },
    abstract:{
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    classify: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    total_wordage: {
        type: Number,
        default: 0
    },
    total_like: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
    modifyDate: {
        type: Date,
        default: Date.now()
    }
};