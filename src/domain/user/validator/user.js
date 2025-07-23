const joi = require("joi");

class UserValidator {
  static validateCreate(user) {
    const schema = joi.object({
      email: joi.string().email().min(3).required(),
      password: joi.string().min(6).max(20).required(),
      fullname: joi.string().min(3).required(),
      username: joi.string().min(3).required(),
      status: joi.boolean().required(),
    });

    const { error } = schema.validate(user, { abortEarly: false });

    if (error)
      throw {
        validator: error.details.map((e) => {
          return {
            path: e.path[0],
            message: e.message,
          };
        }),
        error,
      };
  }

  static validateLogin(user) {
    try {
      const schema = joi.object({
        email: joi.string().email().min(3).required(),
        password: joi.string().min(6).max(20).required(),
      });

      return schema.validate(user);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserValidator;
