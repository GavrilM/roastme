const mongoose = require('mongoose')
const util = require("../lib/util")

const invitee = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    confirmCode: {
        type: String,
        required: true,
    },
    initial: {
        type: String,
        required: true,
    },
})

invitee.pre('validate', function(next){
    this.confirmCode = util.makeid(8)
    next()
})

module.exports = mongoose.model("Invitee", invitee)

