const express = require('express')
const UserRoutes = require('./users')
const RoastRoutes = require('./roasts')
const Misc = require("./util")

const base = express.Router()

base.get('/', (req,res) => {
	res.send(`This is ${__dirname}`)
})

base.use("/api/users", UserRoutes)

base.use("/api/roast", RoastRoutes)

base.use("/api/invite", Misc.invitee)

base.get('*', (req,res) => {
	res.send('Sry my dood, dis a 404 error')
})

module.exports = base

