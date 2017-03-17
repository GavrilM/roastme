const express = require("express");

const api = require("../controllers/roasts.controller");

const roasts = express.Router();

roasts.use(api.sanitize)

roasts.route("/new")
    .get(api.create)
    .post(api.getRoast)
    
    
module.exports = roasts