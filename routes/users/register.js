let co = require("co");
let User = require("../../entities/Users");
module.exports = function(router) {
  router.post("/register", (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    co(function*() {
      let user = yield User.register(email, password);
      return res.json({
        success: true,
        messagge: "Usuario registrado con exito",
        payload: {
          token: ""//user.getToken()
        }
      });
    }).catch(e => next(e));
  });
};
