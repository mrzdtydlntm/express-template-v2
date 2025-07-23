const BaseRoutes = require("../base");
const Swagger = require("./swagger");
const UserRoutes = require("../../domain/user/route/user");

class BaseRoutesV1 extends BaseRoutes {
  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const swaggerRoutes = new Swagger();
    const userRoutes = new UserRoutes();

    this.router.use("/swagger", swaggerRoutes.getRouter());
    this.router.use("/user", userRoutes.getRouter());
  }
}

module.exports = BaseRoutesV1;
