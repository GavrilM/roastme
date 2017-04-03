const mongoose = require("mongoose")
const passport = require("passport")

const roast = mongoose.Schema({
    content: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    location: {
        where: {
            type:String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }
})

mongoose.model("Roast", roast)