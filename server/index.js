const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')

const Db = require("./config/mongoose")
const passportConfig = require("./config/passport")

const Router = require('./routes')

module.exports = function(){
	const app = express()
	passportConfig()

	app.set('views', __dirname + '/app/views');

	app.use(cookieParser())
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json())

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'sessionsecret'
	}))

	app.use(passport.initialize())
	app.use(passport.session())

	app.use(express.static(path.join(__dirname,"public/")))

	app.use(Router)

	app.use((err, req, res, next) => {
		if(err) console.log(err)
	})

	return app
}
