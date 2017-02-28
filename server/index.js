const express = require('express')
const path = require('path')
const expressVue = require('express-vue')

const Router = require('./routes')

module.exports = function(){
	const app = express()

	app.set('views', __dirname + '/app/views');

	app.set('vue', {
	    componentsDir: __dirname + '/components',
	    defaultLayout: 'layout'
	});

	app.engine('vue', expressVue);
	app.set('view engine', 'vue');

	app.use(express.static(path.join(__dirname,"public/")))

	app.use("/", Router.main)

	app.use("/api", Router.api)

	return app
}
