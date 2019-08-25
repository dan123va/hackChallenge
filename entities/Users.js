"use strict";
require("dotenv").config();
let co = require("co");
let DBEntity = require("./DB");
let jwt = require("jsonwebtoken");
let DB = new DBEntity();
let { tap, tapReject } = require("../utils/promiseUtils");
let { getSum } = require("../utils/shasum");
let muebles = require("../stock/muebles");
class User {
  constructor(id) {
    if (!id) {
      throw new Error("User id is missing");
    }
    this.id = String(id);
  }

  getToken() {
    let self = this.id;
    return co(function*() {
      return jwt.sign({ id: self.id }, process.env.SECRET_KEY, {});
    })
      .then(tap.bind(console.log(null, "get Token ok")))
      .catch(tapReject.bind(console.log(null, "get Token error")));
  }

  static getUserByToken(token) {
    return co(function*() {
      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      return new User(decoded.id);
    })
      .then(tap.bind(null, console.log.bind(null, "getUserByToken ok")))
      .catch(
        tapReject.bind(null, console.error.bind(null, "getUserByToken error"))
      );
  }

  static authenticationMiddleware(req, res, next) {
    let token = req.header("Authorization");
    let error = new Error();
    error.directions = "La sesión no es válida, o no existe.";
    if (!token) {
      next(error);
      return;
    }
    User.getUserByToken(token)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        err.directions = error.directions;
        next(err);
      });
  }

  static register(email, password) {
    return co(function*() {
      let collection = yield DB.getCollection("user");
      let userInfo = yield DB.getCollection("userInfo");
      let user = yield collection.findOne({ email: email });
      let pass = getSum(password);
      let result = yield collection.insertOne({
        email: email,
        password: pass
      });
      user = new User(result.insertedId);
      yield userInfo.insertOne({ user: user.id });
      return;
    });
  }

  static saveInfo(params) {
    return co(function*() {
      let collection = yield DB.getCollection("userInfo");
      
      yield collection.updateOne(
        { user: "5d621e56fc2cab1784dd43ac" },
        {
          $set: {
            nombre: params.nombre,
            apellidoPaterno: params.apellidoPaterno,
            apellidoMaterno: params.apellidoMaterno,
            direccion: params.direccion,
            ciudad: params.ciudad,
            producto: params.producto
          }
        }
      );
      return "JAJA";
    });
  }
}

module.exports = User;
