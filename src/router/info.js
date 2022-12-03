const router = require('express').Router()

router.use((req,res,next) => {
  let start = Date.now()
  res.once("finish", () => {
    let end = Date.now() - start
    console.log(`[${new Date().toLocaleString()}] (${res.statusCode}) ${end}ms ${req.method} ${req.originalUrl}`)
  })
  next()
})

module.exports = router