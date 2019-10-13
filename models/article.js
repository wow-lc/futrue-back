module.exports = article = {
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    classify: {
        type: Number,
        required: true,
    },
    author: {
        type: Number,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now(),
    }
};