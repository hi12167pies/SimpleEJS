const path = require("path")
const codes = require("./utils/errorCodes.json")

module.exports.CODES = codes

module.exports.VIEWS = process.cwd() + "\\" + "views"
module.exports.CONFIG = process.cwd() + "\\" + "config.json"

module.exports.LOCAL_VIEWS = path.join(__dirname, "../assets/views")
module.exports.LOCAL_CONFIG = path.join(__dirname, "../assets/config.json")

module.exports.ERROR = require("./utils/errorPage.js")

module.exports.LocalDB = require("./utils/LocalDB.js")