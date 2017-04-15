const express = require("express");
const passport = require('passport')

const api = require("../controllers/roasts.controller");

const roasts = express.Router();

// roasts.use(api.sanitize)

roasts.route("/").get((req, res) => {
	console.log(req.user)
})

roasts.route("/new")
    .post(api.create)

roasts.route('/feed/:groupId')
	// .get((req,res) => {res.send('ok')})
	.get(api.feed)

roasts.route('/:roastId')
	.get(api.getRoast)
    
    
module.exports = roasts