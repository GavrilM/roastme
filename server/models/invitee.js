const mongoose = require('mongoose')

const invitee = new mongoose.Schema({
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
})