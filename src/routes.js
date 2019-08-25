const routes = require("express").Router();
const auth = require("./App/Middleware/auth");
const UserController = require("./App/Controllers/userController");
const SessionController = require("./App/Controllers/sessionControllers");

routes.post("/signup", UserController.store);
routes.post("/signin", SessionController.auth);

routes.use(auth);

routes.get("/user/:uuid", UserController.show);
routes.get("*", (request, response) => {
  return response
    .status(404)
    .json({
      message: "Rota não encontrada"
    })
    .send();
});
module.exports = routes;
