const BaseRoutes = require("../../../api/base");
const UserController = require("../controller/user");

class UserRoutes extends BaseRoutes {
  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const userController = new UserController();

    this.router.post("", userController.createUser);
    this.router.get("", userController.getListUser);
  }
}

module.exports = UserRoutes;
