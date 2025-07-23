const { appKit } = require("../config/env");

class ResponseModule {
  constructor(message, data, error) {
    let errorDisplayed = {};

    if (error) {
      if (appKit.debug) {
        errorDisplayed["debugging"] = { ...(error || { message: error }) } || null;
      }

      if (error?.validator) {
        errorDisplayed["validator"] = error.validator;
      }

      errorDisplayed["message"] = error?.message || message;
    }

    // If data from models.findAll, data variable must be data.rows
    this.response = {
      message: message || "OK!",
      error: errorDisplayed,
      data: data || null,
    };
  }

  responsePagination(count, page, size) {
    let totalData,
      totalPage = 0;

    if (Array.isArray(count)) {
      totalData = count.length;
    } else {
      totalData = count;
    }

    if (size && totalData) {
      totalPage = totalData / size;
      if (totalPage < 1) totalPage = 1;
      else totalPage = Math.abs(Math.ceil(totalPage));
    }

    return {
      ...this.response,
      paginate: {
        page,
        size,
        totalData,
        totalPage,
      },
    };
  }

  responseData() {
    return this.response;
  }
}

module.exports = ResponseModule;
