let co = require("co");
let User = require("../../entities/Users");

module.exports = function(router) {
  router.post("/info", (req, res, next) => {
    let params = req.body;
    let user = req.user
    console.log("USER", user);
    
    co(function*() {
      let data = yield User.saveInfo(params);
      return res.json({
        success: true,
        message: "Datos guardados",
        payload: data
      });
    }).catch(e => next(e));
  });
};
