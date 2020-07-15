const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Acceso public
  app.get("users/api/test/all", controller.allAccess);

  //Acceso a usuarios registrados (todos roles)
  app.get("users/api/test/user", [authJwt.verifyToken], controller.userBoard);

  //Acceso a admin
  app.get(
    "users/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};