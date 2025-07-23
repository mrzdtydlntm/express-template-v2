const express = require("express");
const process = require("process");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const rateLimitMiddleware = require("../middleware/rateLimiter");
const corsMiddleware = require("../middleware/cors");
const { appKit } = require("../../toolkit/config/env");
const { logMiddleware, logUnhandled } = require("../../toolkit/logkit/log");
const apiV1 = require("./v1");
const apiV2 = require("./v2");
const BaseRoutes = require("./base");
const path = require("path");

class Routes extends BaseRoutes {
  constructor() {
    super();
    this.appName = appKit.name;
    this.appPort = parseInt(appKit.port);
    this.appHost = appKit.host;
    this.appBaseURL = appKit.baseURL;

    this.initMiddleware();
    this.initCustomMiddleware();
    this.app.use(this.initRoutes());
    
    this.app.use(logMiddleware);
  }

  initMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.disable("x-powered-by");
    this.app.disable("etag");
  }

  initCustomMiddleware() {
    this.app.use(corsMiddleware);
    this.app.use(rateLimitMiddleware);
  }

  initRoutes() {
    const routesV1 = new apiV1();
    const routesV2 = new apiV2();

    this.router.get("", (_req, res) => {
      return res.status(200).json({
        message: `${this.appName} is running!`,
      });
    });

    this.router.head("", (_req, res) => {
      return res.status(200).json({
        message: `${this.appName} is running!`,
      });
    });

    this.router.use("/v1", routesV1.getRouter()); // V1 API
    this.router.use("/v2", routesV2.getRouter()); // V2 API

    return this.router;
  }

  listen() {
    process.on("uncaughtException", function (err) {
      logUnhandled(err);
    });

    this.app.listen(this.appPort, this.appHost, (error) => {
      if (error) {
        logUnhandled(error);
        return process.exit(1);
      }

      console.log(`${this.appName} has been running on ${this.appBaseURL}`);
    });
  }
}

module.exports = Routes;
