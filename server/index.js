const express = require('express')
const path = require('path')
const passport = require('passport')

const Router = require('./routes')

module.exports = function(){
	const app = express()

	app.set('views', __dirname + '/app/views');

	app.use(passport.initialize())
	app.use(passport.session())

	app.use(express.static(path.join(__dirname,"public/")))

	app.use("/", Router)

	app.use("/api", Router.api)

	return app
}
