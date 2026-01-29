'use strict';
const bcrypt = require("bcryptjs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', 
      [{
        username: 'first_admin',
        email: 'first_admin@gmail.com',
        password: bcrypt.hashSync('firstadmin', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }],
      {}
    )
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', {email: 'first_admin@gmail.com'}, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
