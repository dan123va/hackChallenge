const MongoClient = require("mongodb").MongoClient;
const Entity = require("./Entity");
const { tap, tapReject } = require.main.require("./utils/promiseUtils");

const hardUri =
  "mongodb://liberti:liberti1@ds223653.mlab.com:23653/chat-database";

let dbPool = {};

class DB {
  constructor(uri) {
    this.uri = uri || hardUri;
    this.urisum = this.uri;
  }

  setNewURI (newUri) {
    delete dbPool[this.urisum]
    this.uri = newUri || hardUri
    this.urisum = this.uri
  }

  getDB() {
    var urisum = String(this.urisum);
    if (!dbPool[urisum]) {
      return new Promise((resolve, reject) => {
        MongoClient.connect(this.uri, (err, db) => {
          if (err) {
            return reject(err);
          }
          db.on("close", () => {
            delete dbPool[urisum];
          });
          dbPool[urisum] = db;
          resolve(db);
        });
      });
    }
    return Promise.resolve(dbPool[urisum]);
  }

  getCollection(collectionName) {
    return this.getDB()
      .then((db) => db.collection(collectionName))
      .then(
        tap.bind(null, arg => console.log("getCollection", Object.keys(arg)))
      )
      .catch(
        tapReject.bind(null, console.error.bind(null, "getCollection error"))
      );
  }
}

module.exports = DB;
