const express = require('express')
const fs = require('fs-extra')
const static = require("./static")
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const dirTree = require('node-recursive-directory')

const verbose = argv.verbose != undefined
function note(text, o) {
  if (verbose) {
    console.log(`[${new Date().toLocaleString()}] ${o != undefined ? `(${o.toUpperCase()}) ` : ""}${text}`)
  }
}

let config
try {
  config = require(static.CONFIG)
} catch (e) {}

const app = express()

app.set("view engine", "ejs")
app.set("views", static.VIEWS)

app.use(require("./router/info"))

app.use(express.urlencoded({ extended: false }))

let views = []

async function preLoad() {
  note("check folder views exist", "preload")
  if (!fs.existsSync(static.VIEWS)) {
    note("folder views does not exist, coping from local", "preload")
    fs.copySync(static.LOCAL_VIEWS, static.VIEWS)
  }
  note("check config.json exist", "preload")
  if (!fs.existsSync(static.CONFIG)) {
    note("file config.json does not exist, coping from local", "preload")
    fs.copySync(static.LOCAL_CONFIG, static.CONFIG)
    config = require(static.CONFIG)
  }

  note("loading views...", "preload")
  views = await updateViews()
  main()
}

const updateViews = () => new Promise(async (resolve, reject) => {
  note("read tree", "views")
  let temp = await dirTree(static.VIEWS)
  note("map items (remove absolute directory)", "views")
  temp = temp.map(item => item.slice(process.cwd().length + "/views/".length))
  note("filter item (remove hidden directory, and static)", "views")
  temp = temp.filter(item => {
    for (const ignore of config.private) {
      if (!item.startsWith(ignore) || !item.endsWith(".ejs")) continue
      return false
    }
    return true
  })
  resolve(temp)
})

async function main() {
  app.use(require("./router/prevent")(config))
  app.use(require("./router/main")(config, views, updateViews))

  app.listen(config.port, () => {
    console.log(`[${new Date().toLocaleString()}] EJS-Server online at port ${config.port}`)
  })
}

preLoad()