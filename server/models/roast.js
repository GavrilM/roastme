const mongoose = require("mongoose")
const passport = require("passport")

const roast = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: String
    },
    createdAt: {
        type: Date,
        required: true
    },
    upvotes: {
        type: Number
    }
})

mongoose.model("Roast", roast)