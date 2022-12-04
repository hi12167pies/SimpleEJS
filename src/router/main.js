const static = require("../static")
const fs = require('fs-extra')
const path = require("path")
let config, updateViews
let views = []

const router = require('express').Router()

router.use("*", async (req,res,next) => {
  if (config.updateOnRequest) views = await updateViews()
  const url = req.originalUrl.split("?")[0]
  
  const renderArgs = {
    req, res,
    getErrorPage: code => static.ERROR(config, code),
    LocalDB: static.LocalDB
  }

  // Check binds
  const bind = config.binds.find(x => url == x.url && x.method.toLowerCase() == req.method.toLowerCase())
  if (bind != null) {
    res.render(bind.page, renderArgs)
    next()
    return
  }

  let file = url+ ".ejs"
  if (url.endsWith("/")) file = url + "index.ejs"
  file = file.slice(1)
  
  if (views.includes(file)) {
    res.render(file, renderArgs)
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
  for (const ignore of config.private) {
    if (!file.startsWith(ignore)) continue
    res.status(403).send(static.ERROR(config, 403))
    return
  }
  try {
    const data = fs.readFileSync(path.join(static.VIEWS, file))
    res.write(data)
    res.end()
  } catch (e) {
    res.status(500).send(static.ERROR(config, 500))
  }
}

module.exports = (conf, view, updateview) => {
  config = conf
  views = view
  updateViews = updateview
  return router
}