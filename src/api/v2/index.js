const BaseRoutes = require("../base");
const swagger = require("./swagger");

class BaseRoutesV2 extends BaseRoutes {
  constructor() {
    super();
    this.initRoutes();
  }

  initRoutes() {
    const swaggerRoutes = new swagger();

    this.router.use("/swagger", swaggerRoutes.getRouter());
  }
}

module.exports = BaseRoutesV2;
