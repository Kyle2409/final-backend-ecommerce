const { authJwt } = require("../middleware");
const User = require("../models/user.model");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  // app.get("/", async (req, res) => {
  //   try {
  //     const users = await User.find();
  //     res.json(users);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // });
  
  // app.get("/:id", getUser, (req, res) => {
  //   res.json(res.user);
  // });

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  }
