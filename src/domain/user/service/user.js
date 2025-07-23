const { User, sequelize } = require("../../../../toolkit/database/models");

class UserService {
  static async createUserService(user) {
    const t = await sequelize.transaction();
    try {
      const userResponse = await User.create(user, { transaction: t, returning: true });

      await t.commit();

      return userResponse;
    } catch (error) {
      await t.rollback();

      throw error;
    }
  }

  static async getListUserService(user) {
    try {
      const userResponse = await User.findAll();

      return userResponse;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
