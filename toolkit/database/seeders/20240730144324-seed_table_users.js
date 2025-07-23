"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "me@mrzdtydlntm.my.id",
        fullname: "Mirza Aditya Deliantama",
        username: "mrzdtydlntm",
        password: "$2a$08$uMmP/6z13hgiVmzXMcdy9.nAkI4s91IqtpGBdKguQnRtfsVqPgjaa",
        status: true,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {});
  },
};
