const UserService = require("../service/user");
const UserValidator = require("../validator/user");
const UserModel = require("../models/user");
const UserConstant = require("../constant/user");
const Response = require("../../../../toolkit/module/response");

class UserController {
  constructor() {}

  async createUser(req, res, next) {
    try {
      const { body } = req;
      const userPayload = new UserModel(body);
      UserValidator.validateCreate(userPayload.user);
      const user = await UserService.createUserService(userPayload.toPayloadCreate());

      return res
        .status(200)
        .json(new Response("Success create a user", userPayload.toPayloadDetail(user?.id), null).responseData());
    } catch (error) {
      next({ ...error, customMessage: "Error create a user" });
    }
  }

  async getListUser(req, res, next) {
    try {
      const user = await UserService.getListUserService();
      const userPayload = new UserModel();
      
      return res
        .status(200)
        .json(new Response("Success get list a user", userPayload.toPayloadList(user), null).responseData());
    } catch (error) {
      console.log(error);
      next({ ...error, customMessage: "Error get list a user" });
    }
  }
}

module.exports = UserController;
