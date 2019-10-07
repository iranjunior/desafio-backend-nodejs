const routes = require("express").Router();
const auth = require("./App/Middleware/auth");
const UserController = require("./App/Controllers/userController");
const SessionController = require("./App/Controllers/sessionControllers");
const Validate = require("./App/Middleware/validate");

routes.post("/signup", Validate.signUp, UserController.store);
routes.post("/signin", Validate.signIn, SessionController.auth);

routes.use(auth);

routes.get("/user/:uuid", UserController.show);
routes.put("/user", Validate.update, UserController.update);
routes.delete("/user", UserController.destroy);

routes.get("*", (request, response) =>
    response
        .status(404)
        .json({
            message: "Rota não encontrada"
        })
        .send()
);
module.exports = routes;
