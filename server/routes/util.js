const express = require("express")
const invitee = require("../controllers/util.controller")

const invites = express.Router()

invites.route("/")
    .post(invitee.create)

module.exports.invitee = invites