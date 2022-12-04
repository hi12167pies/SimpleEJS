let config
const static = require('../static')
const router = require('express').Router()

router.use(async (req,res,next) => {
  for (const ignore of config.private) {
    if (!req.url.slice(1).startsWith(ignore)) continue
    res.status(403).send(static.ERROR(config, 403))
    return
  }
  next()
})

module.exports = (conf) => {
  config = conf
  return router
}