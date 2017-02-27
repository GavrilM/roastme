const express = require('express')
const path = require('path')

const Router = require('./routes')

module.exports = function(){
	const app = express()

	app.use(express.static(path.join(__dirname,"public/")))

	app.use("/", Router.main)

	app.use("/api", Router.api)

	return app
}