let co = require("co");
let User = require("../entities/Users");

module.exports = function(router) {
  router.post("/primer", (req, res, next) => {
    co(function*() {
      let data = yield User.getData();
      return res.json({
        success: true,
        message: "Actions",
        payload: data
      });
    }).catch(e => next(e));
  });

  router.post('/segundo', (req, res, next) =>{
      
  })
};
