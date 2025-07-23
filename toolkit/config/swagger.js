const { swaggerKit } = require("./env");

module.exports.swaggerConf = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: swaggerKit.title,
      version: swaggerKit.version,
      description: swaggerKit.description,
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
      contact: {
        name: swaggerKit.name,
        url: swaggerKit.url,
        email: swaggerKit.email,
      },
    },
    basePath: swaggerKit.basePath,
    servers: [
      {
        url: swaggerKit.basePath,
      },
    ],
  },
  tags: [
    {
      name: "User",
      description: "API for users",
    },
  ],
  apis: ["src/api/index.js"],
};
