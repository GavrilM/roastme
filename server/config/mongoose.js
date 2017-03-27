const dburl = require("./vars").dburl
const mongoose = require("mongoose")

const db = mongoose.connect(dburl)

require("../models/user")
require("../models/roast")
require("../models/invitee")
require("../models/group")

module.exports = db
