let co = require("co");
let DBEntity = require("./DB");
let DB = new DBEntity();

class User {
  constructor(id) {
    if (!id) {
      throw new Error("User id is missing");
    }
    this.id = String(id);
  }

  static getData() {
    return co(function*() {
      let collection = yield DB.getCollection("userhack");
      if (collection) {
        yield collection.insertOne({user: "12345678"})
      } else {
        console.log("NO");
      }
      return "JAJA";
    });
  }
}

module.exports = User;
