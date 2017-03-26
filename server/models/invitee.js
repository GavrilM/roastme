const mongoose = require('mongoose')

module.exports.invitee = mongoose.model("invitee",new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
}))