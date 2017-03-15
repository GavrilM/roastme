const dburl = require("./vars").dburl
const mongoose = require("mongoose")

const db = mongoose.connect(dburl)

require("../models/user")

module.exports = db
