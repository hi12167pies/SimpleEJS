const static = require("../static")
const fs = require('fs-extra')
const path = require("path")
let config, updateViews
let views = []

const router = require('express').Router()

router.get("*", async (req,res,next) => {
  if (config.updateOnRequest) views = await updateViews()
  const url = req.originalUrl.split("?")[0]
  let file = url+ ".ejs"
  if (url.endsWith("/")) file = url + "index.ejs"
  file = file.slice(1)
  
  if (views.includes(file)) {
    res.render(file, {req, res})
  } else {
    // remove .ejs extention
    file = file.slice(0, -4)

    if (fs.existsSync(path.join(static.VIEWS, file))) {
      staticFile(req, res, file)
    } else {
      res.status(404).send(static.ERROR(config, 404))
    }
  }
  next()
})

function staticFile(req, res, file) {
  if (file.endsWith(".ejs")) return res.status(403).send(static.ERROR(config, 403))
  for (const ignore of config.ignoreFolder) {
    if (!file.startsWith(ignore)) continue
    res.status(403).send(static.ERROR(config, 403))
    return
  }
  const data = fs.readFileSync(path.join(static.VIEWS, file))
  res.write(data)
  res.end()
}

module.exports = (conf, view, updateview) => {
  config = conf
  views = view
  updateViews = updateview
  return router
}