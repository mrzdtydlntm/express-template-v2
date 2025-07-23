const BaseRoutes = require("../base");
const swaggerJsdoc = require("swagger-jsdoc");
const { serve, setup } = require("swagger-ui-express");
const { swaggerConf } = require("../../../toolkit/config/swagger");

class SwaggerRoutes extends BaseRoutes {
  constructor() {
    super();
    this.specDoc = swaggerJsdoc(swaggerConf);
    this.initRoutes();
  }

  initRoutes() {
    this.router.use("/docs", serve);
    this.router.get("/docs", setup(this.specDoc, { explorer: true }));
    this.router.get("/mantap", (req, res, next) => {
      return res.status(200).send("OKE!");
    });
  }
}

module.exports = SwaggerRoutes;