const cors = require("cors");
const { corsKit } = require("../../toolkit/config/env");

const corsOption = {
  origin: corsKit.origin,
  methods: corsKit.methods,
  credentials: corsKit.credentials,
  allowedHeaders: corsKit.allowedHeaders,
};

module.exports = cors(corsOption);
