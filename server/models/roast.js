const mongoose = require("mongoose")
const passport = require("passport")

const roast = mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        username: {
            type: String,
            required:true
        },
        displayName: {
            type: String,
            required:true
        }
    },
    createdAt: {
        type: Date,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    upvoted: {
        type: Array,
        default: []
    },
    downvoted: {
        type: Array,
        default: []
    },
    location: {
        where: {
            type:String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    }
})

module.exports = mongoose.model("Roast", roast)