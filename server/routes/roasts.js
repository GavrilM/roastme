const express = require("express");

const api = require("../controllers/roasts.controller");

const roasts = express.Router();

roasts.use(api.sanitize)

roasts.route("/").get((req, res) => {
	console.log(req.user)
})

roasts.route("/new")
    .get(api.create)
    .post(api.getRoast)
    
    
module.exports = roasts