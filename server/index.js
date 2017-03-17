const express = require('express')
const path = require('path')
const passport = require('passport')

const Db = require("./config/mongoose")

const Router = require('./routes')
const UserRoutes = require('./routes/users')
const RoastRoutes = require('./routes/roasts')
const Misc = require("./routes/util")

module.exports = function(){
	const app = express()

	app.set('views', __dirname + '/app/views');

	app.use(passport.initialize())
	app.use(passport.session())

	app.use(express.static(path.join(__dirname,"public/")))

	app.use("/api/users", UserRoutes)
	
	app.use("/api/roast", RoastRoutes)
	
	app.use("/api/invite", Misc.invitee)

	app.use("/", Router)

	app.use((err, req, res, next) => {
		if(err) console.log(err)
		res.status(500).send('Oops! Server Error')
	})

	return app
}
