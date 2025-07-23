const winston = require("winston");
const response = require("../module/response");

// Configure Winston for console logging
const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple() // More readable format in the console
      ),
    }),
  ],
});

class Logkit {
  static logUnhandled(error) {
    logger.error("Unhandled Error >>> ", {
      timestamp: new Date().toISOString(),
      stack: error?.stack,
      error: error?.message,
      ...error,
    });
  }

  static logError(error, ...msg) {
    const errMsg = {};
    for (const param of msg) {
      if (typeof param === "object") {
        Object.assign(errMsg, param);
      } else {
        Object.assign(errMsg, { other: param });
      }
    }

    logger.error("Error Info >>> ", {
      timestamp: new Date().toISOString(),
      stack: error?.stack,
      error: error?.message,
      statusCode: error?.statusCode || error?.status,
      ...error,
    });
  }

  static logInfo(...msg) {
    // Consolidate additional parameters into a single object
    const infoMsg = {};
    for (const param of msg) {
      if (typeof param === "object") {
        Object.assign(infoMsg, param);
      } else {
        Object.assign(errMsg, { other: param });
      }
    }

    logger.info("Info >>> ", {
      timestamp: new Date().toISOString(),
      ...infoMsg,
    });
  }

  static logMiddleware(error, req, res, next) {
    const addOnErr = [];
    const {
      method,
      body,
      param,
      query,
      headers: { authorization },
    } = req;

    const logData = {
      method,
      body,
      query,
      param,
      authorization,
    };

    // Capture and log errors
    if (error) {
      addOnErr.push(logData);

      if (error?.parent?.sqlState) {
        const msg = {
          sqlState: `(${error?.parent?.sqlState}): ${error?.parent?.code} ${error?.parent?.sqlMessage}`,
        };

        addOnErr.push(msg);
      }

      Logkit.logError(error, ...addOnErr);

      const err = new response(error?.customMessage, error?.data, error).responseData();
      const status = error?.statusCode || error?.status;

      return res.status(status || 500).json(err);
    }
  }
}

module.exports = Logkit;
