module.exports = class LocalDB {
  static #list = {}
  static get(name) {
    let db = this.#list[name]
    if (db == undefined) {
      db = new LocalDB()
      this.#list[name] = db
    }
    return db
  }

  memory = {}
  set(key,value) {
    this.memory[key] = value
  }
  remove(key) {
    delete this.memory[key]
  }
  get(key) {
    return this.memory[key]
  }
  getAll() {
    return this.memory
  }
}