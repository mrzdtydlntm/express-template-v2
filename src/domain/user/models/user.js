const cryptHelper = require("../helper/crypt");

class UserModel {
  constructor(user = null) {
    this.user = {
      id: user?.id,
      fullname: user?.fullname,
      email: user?.email,
      username: user?.username,
      password: user?.password,
      status: user?.status,
    };
  }

  toPayloadCreate() {
    this.user.password = cryptHelper.encrypt(this.user.password);
    return this.user;
  }

  toPayloadList(list) {
    for (let i = 0; i < list.length; i++) {
      delete list[i].dataValues.password;
    }
    return list;
  }

  toPayloadDetail(id = null) {
    if (id) this.user["id"] = id;
    delete this.user.password;
    return this.user;
  }
}

module.exports = UserModel;
