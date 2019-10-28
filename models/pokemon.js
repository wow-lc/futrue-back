module.exports = {
    pid: {
        type: Number,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    type: {
        type: Array,
        required: true
    },
    weight: {
        type: Number,
        required: false,
        default:0
    },
    height: {
        type: Number,
        required: false,
        default:0
    },
    ability: {
        type: Array,
        required: true
    },
    region: {
        type: Array,
        required: true
    }
}

