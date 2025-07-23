const express = require("express");

class BaseRoutes {
  constructor() {
    this.app = express();
    this.router = express.Router();
  }

  initRoutes() {
    throw new Error('Method "initRoutes" must be implemented');
  }

  getRouter() {
    return this.router;
  }
}

module.exports = BaseRoutes;
