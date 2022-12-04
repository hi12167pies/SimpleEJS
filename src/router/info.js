const router = require('express').Router()
const colors = require('colors')

const static = require('../static')

router.use((req,res,next) => {
  let start = Date.now()
  res.once("finish", () => {
    let end = Date.now() - start
    const msg = `[${new Date().toLocaleString()}] ${end}ms ${res.statusCode} ${static.CODES[res.statusCode]} ${req.method} ${req.originalUrl}`
    if (within(res.statusCode, 200, 299)) {
      console.log(msg.green)
    } else if (within(res.statusCode, 300, 399)) {
      console.log(msg.yellow)
    } else if (within(res.statusCode, 400, 599)) {
      console.log(msg.red)
    } else {
      console.log(msg.white)
    }
  })
  next()
})

function within(x, min, max) {
  return x >= min && x <= max
}

module.exports = router